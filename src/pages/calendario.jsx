import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Flex,
    Card,
    Heading,
    Text,
    Icon,
    withAuthenticator,
    Divider,
    Button,
    Collection,
    View,
    ScrollView,
    Input,
    Label,
    useTheme
} from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/api";
import { listMeetings } from "../graphql/queries";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import NewClass from "./nueva-clase";
import JoinClass from "./unirse-clase";

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
      }
      nextToken
      __typename
    }
  }
`;

const customQueryProgram = /* GraphQL */ `
  query GetProgram($id: ID!) {
    getProgram(id: $id) {
        id
        name
        instructors {
            items {
                instructor {
                    userId
                }
            }
        }
        createdAt
        updatedAt
        owner
        __typename
    }
  }
`;

const Calendario = ({ isPassedToWithAuthenticator, signOut, user }) => {
    const [program, setProgram] = useState();
    const [student, setStudent] = useState();
    const [isInstructor, setIsInstructor] = useState();
    const [weeklyActivities, setWeeklyActivities] = useState([]);
    const [firstDate, setFirstDate] = useState(new Date());
    const [isNewOpen, setNewOpen] = useState(false);
    const [isJoinOpen, setJoinOpen] = useState(false);
    const [timeMarker, setTimeMarker] = useState(-1212.0);
    const [meeting, setMeeting] = useState();
    const { studentId, programId } = useParams();
    const navigate = useNavigate();
    const { tokens } = useTheme();

    useEffect(() => {
        checkUserId();
        getWeeklyActivities();
        return startTimeMarker();
    }, [firstDate, isNewOpen]);

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

        await readProgram();
    }

    async function readProgram() {
        try {
            const programData = await client.graphql({
                query: customQueryProgram,
                variables: { id: programId }
            });
            const program = programData.data.getProgram;
            setProgram(program);
            setIsInstructor(program.instructors.items.find(instructor => instructor.instructor.userId === user.userId));
        } catch (err) {
            console.log(err);
            console.log('error fetching programs');
        }
    }

    function startTimeMarker() {

        const interval = setInterval(() => {
            setTimeMarker(oldTimeMarker => parseFloat(oldTimeMarker) + 5 / 6);
        }, 60000);

        const hourMin = (new Date()).toLocaleTimeString().split(":");
        const newTimeMarker = -1212.0 + hourMin[0] * 50 + hourMin[1] * 50 / 60;
        setTimeMarker(newTimeMarker);

        return () => clearInterval(interval);
    }

    async function getDailyActivities(weeklyActivities) {
        const variables = {
            filter: {
                programID: {
                    eq: programId
                }
            }
        };

        let meetings = await client.graphql({
            query: listMeetings,
            variables: variables
        }).then((meetingData) => {
            return meetingData.data.listMeetings.items;
        }).catch((error) => {
            console.log(error);
            console.log('error fetching meetings');
        });

        return weeklyActivities.map((dayActivities) => {
            const auxDate = dayActivities.date;
            auxDate.setDate(auxDate.getDate() - 1);
            const dayMeetings = meetings.filter(meeting => (new Date(meeting.date)).toDateString() === auxDate.toDateString());
            return {
                day: dayActivities.day,
                date: dayActivities.date,
                dateFormatted: dayActivities.dateFormatted,
                isToday: dayActivities.isToday,
                activities: dayMeetings,
            }
        });
    }

    async function getWeeklyActivities() {
        const weeklyActivities = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(firstDate);
            date.setDate(firstDate.getDate() + i);

            weeklyActivities.push({
                day: getDayName(date),
                date: date,
                dateFormatted: `${date.getDate()}/${date.getMonth() + 1}`,
                isToday: date.toDateString() === (new Date()).toDateString(),
                activities: []
            });
        }

        setWeeklyActivities(await getDailyActivities(weeklyActivities));
    }

    function incDecDate(inc = true, date = firstDate) {
        const auxDate = new Date(date);
        auxDate.setDate(auxDate.getDate() + (inc ? 1 : -1));
        setFirstDate(auxDate);
    }

    function getDayName(date) {
        const weekDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        return weekDays[date.getDay()];
    }

    function generateHours() {
        const hours = [];

        for (let hour = 0; hour < 24; hour++) {
            hours.push(`${hour}:00`);
        }

        return hours;
    }

    function getActivityYPos(hour) {
        const hourMin = hour.split(":");
        return `${parseInt(hourMin[0]) * 50 + parseFloat(hourMin[1]) * 50 / 60 }px`
    }

    function getActivityHeight(duration) {
        return `${duration * 50}px`
    }

    function handleOpenClass(meeting) {
        setMeeting(meeting);
        setJoinOpen(true);
    }

    return (
        <Flex direction="column">
            <Heading level={2}>{"Calendario " + (program ? program.name : " ")}</Heading>
            {
                student ? program && (
                    <Card as="section">
                        <Flex direction="row" alignContent="center" justifyContent="center" alignItems="center">
                            <Label htmlFor="date">Selecciona una fecha:</Label>
                            <Input id="date" type="date" width="40%" onChange={(e) => incDecDate(true, e.currentTarget.value)} />
                            {isInstructor && (
                                <Button variation="primary" onClick={() => setNewOpen(true)}>Crear reunión</Button>
                            )}
                        </Flex>
                        <Flex direction="column" alignItems="center">
                            <Flex direction="row" gap="20px" alignContent="center" justifyContent="center" alignItems="center">
                                <Button onClick={() => incDecDate(false)} size="large">
                                    <Icon ariaLabel="Atrás" as={MdArrowBackIos} />
                                </Button>
                                <Button onClick={() => incDecDate()} size="large">
                                    <Icon ariaLabel="Adelante" as={MdArrowForwardIos} />
                                </Button>
                                <Collection
                                    items={weeklyActivities}
                                    type="list"
                                    direction="row"
                                    rowGap="0px"
                                    columnGap="5px"
                                    wrap="nowrap"
                                    justifyContent="center"
                                    margin="small"
                                    marginRight="28px"
                                    searchNoResultsFound={
                                        <Flex justifyContent="center">
                                            <Text> No existen fechas </Text>
                                        </Flex>
                                    }
                                >
                                    {(item, index) => (
                                        <View
                                            key={index}
                                            borderRadius="medium"
                                            width="9rem"
                                            gap="2rem"
                                            padding="medium"
                                            backgroundColor={tokens.colors.background.secondary}
                                            className="action"
                                        >
                                            <Flex
                                                direction="column"
                                                alignContent="center"
                                                alignItems="center"
                                                justifyContent="space-evenly"
                                                wrap="wrap"
                                                height="100%"
                                            >
                                                <Heading level={4}>{item.day}</Heading>
                                                <Text>{item.dateFormatted}</Text>
                                            </Flex>
                                        </View>
                                    )}
                                </Collection>
                            </Flex>
                            <ScrollView height="600px" maxHeight="100%">
                                <Flex direction="row" alignItems="flex-start" justifyContent="flex-start">
                                    <Collection
                                        items={generateHours()}
                                        type="list"
                                        direction="column"
                                        rowGap="0px"
                                        wrap="nowrap"
                                        justifyContent="center"
                                        margin="small"
                                        searchNoResultsFound={
                                            <Flex justifyContent="center">
                                                <Text> No existen horas </Text>
                                            </Flex>
                                        }
                                    >
                                        {(item, index) => (
                                            <View
                                                key={index}
                                                borderRadius="medium"
                                                width="9rem"
                                                gap="2rem"
                                                padding="0px"
                                                height="50px"
                                            >
                                                <Divider marginLeft="10px" width="90vw"/>
                                                <Heading level={6}>{item}</Heading>
                                            </View>
                                        )}
                                    </Collection>
                                    <Collection
                                        items={weeklyActivities}
                                        type="list"
                                        direction="row"
                                        rowGap="0px"
                                        columnGap="5px"
                                        wrap="nowrap"
                                        justifyContent="center"
                                        margin="small"
                                        searchNoResultsFound={
                                            <Flex justifyContent="center">
                                                <Text> No existen fechas </Text>
                                            </Flex>
                                        }
                                    >
                                        {(item, index) => (
                                            <Card
                                                key={index}
                                                borderRadius="medium"
                                                position="relative"
                                                height="1200px"
                                                backgroundColor={tokens.colors.overlay[item.isToday ? 50 : 5]}
                                                width="9rem"
                                                padding="0px"
                                            >
                                                {
                                                    item.activities.map((activity, index) => (
                                                        <View
                                                            key={index}
                                                            borderRadius="medium"
                                                            position="absolute"
                                                            top={getActivityYPos(activity.time)}
                                                            left="0.5rem"
                                                            marginInline="auto"
                                                            width="8rem"
                                                            height={getActivityHeight(1)}
                                                            padding="0px"
                                                            backgroundColor={tokens.colors.background.secondary}
                                                            onClick={() => handleOpenClass(activity)}
                                                            className="action"
                                                        >
                                                            <Flex
                                                                direction="column"
                                                                alignContent="center"
                                                                alignItems="center"
                                                                justifyContent="center"
                                                                wrap="nowrap"
                                                                height="100%"
                                                            >
                                                                <Heading level={6}>{activity.title}</Heading>
                                                            </Flex>
                                                        </View>
                                                    ))
                                                }
                                                
                                            </Card>
                                        )}
                                    </Collection>
                                </Flex>
                                <Divider
                                    position="relative"
                                    top={`${timeMarker}px`}
                                    width="90vw"
                                    marginBlock="0px"
                                    marginLeft="22px"
                                    borderColor={tokens.colors.border.success}
                                />
                            </ScrollView>
                        </Flex>
                    </Card>
                ) : (
                    <Card>
                        <Text>No tienes acceso a este curso</Text>
                        <Button margin="large">Explorar cursos</Button>
                    </Card>
                )
            }
            {
                program && isNewOpen && (
                    <NewClass
                        isOpen={isNewOpen}
                        onClose={() => setNewOpen(false)}
                    />
                )
            }
            {
                program && isJoinOpen && (
                    <JoinClass
                        isOpen={isJoinOpen}
                        onClose={() => setJoinOpen(false)}
                        programId={programId}
                        meeting={meeting}
                    />
                )
            }
        </Flex>
    )

}

export default withAuthenticator(Calendario);

export async function getStaticProps() {
    return {
        props: {
            isPassedToWithAuthenticator: true,
        },
    };
}

