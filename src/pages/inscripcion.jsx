import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import { getCurrentUser, signOut } from '@aws-amplify/auth';
import { getProgram } from "../graphql/queries";
import { payCourse } from "../../backend/payments"

const client = generateClient();

const Inscripcion = () => {

    const [program, setProgram] = useState();
    const { programId } = useParams();

    useEffect(() => {
        readProgram();
    }, []);

    async function readProgram() {
        try {
            const programData = await client.graphql({
                query: getProgram,
                variables: { id: programId }
            });
            const program = programData.data.getProgram;
            setProgram(program);
        } catch (err) {
            console.log(err);
            console.log('error fetching programs');
        }
    }

    async function currentAuthenticatedUser() {
        try {
            const { username, userId, signInDetails } = await getCurrentUser();
            return {
                userId: userId,
                name: username,
                email: signInDetails.loginId
            };
        } catch (err) {
            console.log(err);
        }
    }

    const currentUser = currentAuthenticatedUser();


    const PriceDetail = ({detail, price}) => {
        return (
            <Card>
                <Flex alignItems="stretch" alignContent="stretch" justifyContent="space-between" wrap="wrap">
                    <Heading level={4} textAlign="start">{detail}</Heading>
                    <Heading level={4} textAlign="end">{price}</Heading>
                </Flex>            
            </Card>
        );
    }

    return (
        <Flex direction="column">
            <Heading level={2}>Inscripciones {program ? program.name : " "}</Heading>
            { 
                program && (
                    <Card as="section">
                        <Flex alignItems="center" alignContent="center" justifyContent="center" wrap="wrap">
                            <Card width="45%">
                                <Flex direction="column">
                                    <PriceDetail
                                        detail={program.name}
                                        price={"$ " + program.price}
                                    />
                                    <PriceDetail
                                        detail="Impuestos"
                                        price="$ 0.00"
                                    />
                                    <PriceDetail
                                        detail="Descuento"
                                        price={"- $ " + program.discount}
                                    />
                                    <Divider />
                                    <PriceDetail
                                        detail="Total"
                                        price={"$ " + (program.price - program.discount).toFixed(2)}
                                    />
                                    <Button
                                        variation="primary"
                                        width="40%"
                                        marginInline="auto"
                                        onClick={
                                            async () => {
                                                payCourse({
                                                    ... await currentUser,
                                                    ...{ programId: program.id, price: program.price - program.discount }
                                                })
                                            }
                                        }
                                    >
                                        Inscribirme
                                    </Button>
                                    <Button width="40%" marginInline="auto">Aplicar Cupón</Button>
                                </Flex>
                            </Card>
                            <Card width="45%">
                                <Image src={program.image} alt={program.name} borderRadius="large" />
                            </Card>
                        </Flex>
                    </Card>
                )
            }
        </Flex>
    );
}

export default Inscripcion;

