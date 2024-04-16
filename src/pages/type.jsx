import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Flex,
    Card,
    Heading,
    Text,
    Image,
    Link,
    Divider,
    Button,
    Collection,
    useTheme
} from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/api";
import { listPrograms } from "../graphql/queries";

const client = generateClient();

const Type = () => {

    const [programs, setPrograms] = useState([]);
    const { type } = useParams();
    const { tokens } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        filterPrograms();
    }, []);

    async function filterPrograms() {

        const variables = {
            filter: {
                type: {
                    eq: type
                }
            }
        };

        try {
            const programData = await client.graphql({
                query: listPrograms,
                variables: variables
            });
            const programs = programData.data.listPrograms.items;
            setPrograms(programs);
        } catch (err) {
            console.log('error fetching programs');
        }
    }


    return (
        <Collection
            items={programs}
            type="list"
            direction="row"
            gap="20px"
            wrap="wrap"
            justifyContent="center"
            margin="large"
            searchNoResultsFound={
                <Flex justifyContent="center">
                    <Text> No se han encontrado cursos </Text>
                </Flex>
            }
        >
            {(item, index) => (
                <Card
                    key={index}
                    borderRadius="medium"
                    maxWidth="20rem"
                    gap="2rem"
                    padding="large"
                    backgroundColor={tokens.colors.background.secondary}
                >
                    <Flex direction="column" alignContent="center" alignItems="center">
                        <Heading level={3}>{item.name}</Heading>
                        <Image src={item.image} alt={item.name} borderRadius="medium" />
                        {
                            item.discount ? (
                                <Flex direction="column">
                                    <Heading level={3} textDecoration="line-through" color="red">{"$ " + item.price}</Heading>
                                    <Heading level={3}>{"$ " + (item.price - item.discount).toFixed(2)}</Heading>
                                </Flex>
                            ) : (
                                <Heading level={3}>{item.price}</Heading>
                            )
                        }
                        <Text>{item.shortDescription}</Text>
                        <Button variation="primary" onClick={() => navigate(`/inscripcion/${item.id}`)}>
                            Inscribirme
                        </Button>
                        <Button>Contenido</Button>
                    </Flex>
                </Card>
            )}
        </Collection>
    );
}

export default Type;