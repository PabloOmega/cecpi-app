import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Flex,
    Card,
    Heading,
    Text,
    Loader,
    withAuthenticator,
    Divider,
    Button,
    Collection,
    Image,
    Icon,
    View,
    useTheme
} from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/api";
import { listStudents, getProgram } from "../graphql/queries";
import { GiNotebook } from "react-icons/gi";
import { MdCalendarMonth } from "react-icons/md";
import activitiesLogo from '../assets/activities.svg'
import calendarLogo from '../assets/calendar.svg'

const client = generateClient();

const Program = ({ isPassedToWithAuthenticator, signOut, user }) => {
    const [program, setProgram] = useState();
    const [student, setStudent] = useState();
    const { studentId, programId } = useParams();
    const navigate = useNavigate();
    const { tokens } = useTheme();

    const actions = [
        {
            icon: GiNotebook,
            title: "Actividades",
            description: "Mira los videos del curso y completa las actividades",
            href: "/actividades",
            viewBox: { width: 500, height: 500 },
            height: "100px",
            svg: activitiesLogo
        },
        {
            icon: MdCalendarMonth,
            title: "Calendario",
            description: "Únete a la clases y mira las próximas sesiones",
            href: "/calendario",
            viewBox: { minX: -0.5, minY: 0, width: 25, height: 25 },
            height: "110px",
            svg: calendarLogo
        },
    ]

    useEffect(() => {
        checkUserId();
        //readProgram();
    }, []);

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
            query: listStudents,
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

        await readProgram();
    }

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

    return (
        <Flex direction="column">
            <Heading level={2}>{program ? program.name : " "}</Heading>
            {
                student ? program && (
                    <Card as="section">
                        <Collection
                            items={actions}
                            type="list"
                            direction="row"
                            gap="20px"
                            wrap="wrap"
                            justifyContent="center"
                            margin="large"
                            searchNoResultsFound={
                                <Flex justifyContent="center">
                                    <Text> No existen acciones </Text>
                                </Flex>
                            }
                        >
                            {(item, index) => {
                                if (item.title === "Calendario" && !program.isLive) return;
                                return (
                                    <View
                                        key={index}
                                        borderRadius="medium"
                                        gap="2rem"
                                        padding="large"
                                        maxWidth="20rem"
                                        backgroundColor={tokens.colors.background.secondary}
                                        onClick={() => navigate(`${item.href}/${studentId}/${programId}`)}
                                        className="action"
                                    >
                                        <Flex direction="column" justifyContent="space-between" alignItems="center">
                                            <Icon
                                                ariaLabel={item.title}
                                                viewBox={item.viewBox}
                                                as={item.icon}
                                                height={item.height}
                                            />
                                            {/*<Image alt={item.title} src={item.svg} />*/}
                                            <Heading level={4}>{item.title}</Heading>
                                            <Text>{item.description}</Text>
                                        </Flex>
                                    </View>
                                )
                            }}
                        </Collection>
                    </Card>
                ) : (
                    <Card>
                        <Text>No tienes acceso a este curso</Text>
                        <Button margin="large">Explorar cursos</Button>
                    </Card>
                )
            }
        </Flex>
    );

}

export default withAuthenticator(Program);
