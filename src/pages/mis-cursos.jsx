import { generateClient } from "aws-amplify/api";
import { getCurrentUser, signOut } from '@aws-amplify/auth';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
    Flex,
    Card,
    Heading,
    Text,
    Image,
    withAuthenticator,
    Divider,
    Button,
    Collection,
    useTheme
} from '@aws-amplify/ui-react';

const client = generateClient();

const customQueryStudents = /* GraphQL */ `
  query ListStudents(
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        email
        name
        createdAt
        updatedAt
        owner
        Programs {
            items {
                program {
                    id
                    name
                    image
                    shortDescription
                }
            }
        }
        __typename
      }
      nextToken
      __typename
    }
  }
`;

const MisCursos = ({ isPassedToWithAuthenticator, signOut, user }) => {
    const [student, setStudent] = useState();
    const { studentId } = useParams();
    const navigate = useNavigate();
    const { tokens } = useTheme();

    useEffect(() => {
        checkUserId();
    });

    //if (!isPassedToWithAuthenticator) {
    //    throw new Error(`isPassedToWithAuthenticator was not provided`);
    //}

    async function checkUserId() {
        let userId = user.userId;

        if (!userId) {
            console.log("ingresar");
            return;
        }

        const variables = {
            filter: {
                userId: {
                    eq: userId
                }
            }
        };

        let students = await client.graphql({
            query: customQueryStudents,
            variables: variables
        }).then((studentData) => {
            return studentData.data.listStudents.items;
        }).catch((error) => {
            console.log(error);
            console.log('error fetching students');
        });

        if (!students.length) {
            console.log("No inscrito");
            return;
        }

        if (studentId !== students[0].id) {
            console.log("No corresponde");
            navigate(`/mis-cursos/${students[0].id}`);
        }

        setStudent(students[0]);
    } 

    return (
        <Flex direction="column">
            <Heading level={2}>Mis Cursos</Heading>
            {
                student ? (
                    <Collection
                        items={student.Programs.items}
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
                                    <Heading level={3}>{item.program.name}</Heading>
                                    <Image src={item.program.image} alt={item.program.name} borderRadius="medium" />
                                    <Text>{item.program.shortDescription}</Text>
                                    <Button variation="primary" onClick={() => navigate(`/curso/${studentId}/${item.program.id}`)}>
                                        Ir al curso
                                    </Button>
                                </Flex>
                            </Card>
                        )}
                    </Collection>
                ) : (
                    <Card>
                            <Text>No te haz inscrito a ningún curso</Text>
                            <Button margin="large">Explorar cursos</Button>
                    </Card>
                )
            }
        </Flex>
    )

}

export default withAuthenticator(MisCursos);

export async function getStaticProps() {
    return {
        props: {
            isPassedToWithAuthenticator: true,
        },
    };
}