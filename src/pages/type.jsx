import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Flex,
    Card,
    Heading,
    Text,
    Image,
    Button,
    Collection,
    useTheme
} from '@aws-amplify/ui-react';
import ProgramCard from './components/ProgramCard';
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
            {(program) => (
                <ProgramCard key={program.id} program={program} />
            )}
        </Collection>
    );
}

export default Type;