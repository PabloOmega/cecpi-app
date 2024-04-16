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
    View,
    useTheme
} from '@aws-amplify/ui-react';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import { generateClient } from "aws-amplify/api";
import { createProgress, updateProgress } from "../graphql/mutations";
import Step from "./step";

import { ThemeProvider } from 'styled-components';
import {
    MeetingProvider,
    darkTheme
} from 'amazon-chime-sdk-component-library-react';
import Meeting from './meeting';
import MeetingForm from './meeting-form';

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
        Progresses {
            items {
                id
                progress
                Step {
                    id
                    unitID
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

const customQueryProgram = /* GraphQL */ `
  query GetProgram($id: ID!) {
    getProgram(id: $id) {
        id
        name
        type
        price
        discount
        image
        shortDescription
        students {
        nextToken
        __typename
        }
        Units {
            items {
                Steps {
                    items {
                        id
                        poster
                        description
                        title
                        Video {
                            path
                        }
                    }
                }
                poster
                title
                createdAt
            }
        }
        createdAt
        updatedAt
        owner
        __typename
    }
  }
`;

const Actividades = ({ isPassedToWithAuthenticator, signOut, user }) => {
    const [program, setProgram] = useState();
    const [student, setStudent] = useState();
    //const [steps, setSteps] = useState();
    //const [step, setStep] = useState();
    const [isStepOpen, setStepOpen] = useState(false);
    //const [progress, setProgress] = useState(0);
    const [progresses, setProgresses] = useState([]);
    const [unitIndex, setUnitIndex] = useState(0);
    const [stepIndex, setStepIndex] = useState(0);
    const [seeked, setSeeked] = useState(true);
    const { studentId, programId } = useParams();
    const navigate = useNavigate();
    const { tokens } = useTheme();

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

        await readProgram(students[0]);
    } 

    async function readProgram(student) {
        try {
            const programData = await client.graphql({
                query: customQueryProgram,
                variables: { id: programId }
            });
            const program = programData.data.getProgram;
            setProgram(program);
            getProgresses(program.Units.items, student);
        } catch (err) {
            console.log(err);
            console.log('error fetching programs');
        }
    }

    function getProgresses(units, student) {
        units.forEach((unit, unitIndex) => {
            progresses.push([]);
            unit.Steps.items.forEach((step, stepIndex) => {
                progresses[unitIndex][stepIndex] = { id: "", progress: null };
                student.Progresses.items.forEach((progress) => {
                    if (step.id === progress.Step.id) {
                        progresses[unitIndex][stepIndex].id = progress.id;
                        progresses[unitIndex][stepIndex].progress = progress.progress;
                        return;
                    }
                })
            })
        });
        setProgresses(progresses);
    }

    function getUnitProgress(unitIndex) {
        let unitProgress = 0.0;
        progresses[unitIndex].forEach((progress) => {
            unitProgress += progress.progress === null ? 0 : parseFloat(progress.progress);
        });
        return parseInt(unitProgress * 100 / progresses[unitIndex].length);
    }

    async function getOrCreateProgress(stepId, stepIndex) {
        if (progresses[unitIndex][stepIndex].progress !== null) return;

        const progressDetails = {
            studentID: studentId,
            progress: 0,
            progressStepId: stepId
        };

        try {
            const newProgress = await client.graphql({
                query: createProgress,
                variables: { input: progressDetails }
            });
            progresses[unitIndex][stepIndex].id = newProgress.data.createProgress.id;
            progresses[unitIndex][stepIndex].progress = 0; 
            setProgresses(progresses);
        } catch (err) {
            console.log(err);
            console.log('error creando progreso');
        }

    }

    async function handleStepClick(stepIndex) {
        await getOrCreateProgress(program.Units.items[unitIndex].Steps.items[stepIndex].id, stepIndex);
        setStepIndex(stepIndex);
        //setStep(step);
        setSeeked(false);
        setStepOpen(true);
    }

    async function handlePreviousNextStepClick(progressId, newProgressValue, previous = true) {
        await handleStepClose(progressId, newProgressValue);
        await handleStepClick(stepIndex + (previous ? -1 : 1));
    }

    async function handleStepClose(progressId, newProgressValue) {
        const progressDetails = {
            id: progressId,
            progress: newProgressValue,
        };

        progresses[unitIndex][stepIndex].progress = newProgressValue;
        setProgresses(progresses);
        setStepOpen(false);

        try {
            const newProgress = await client.graphql({
                query: updateProgress,
                variables: { input: progressDetails }
            });

        } catch (err) {
            console.log(err);
            console.log('error actualizando progreso');
        }

    }

    return (
        <Flex direction="column">
            <Heading level={2}>{program ? program.name : " "}</Heading>
            {
                student ? program && (
                    <Card as="section">
                        <Flex direction="row" justifyContent="space-between" wrap="wrap">
                            <Card width="35%" padding="small">
                                <Collection
                                    items={program.Units.items}
                                    type="list"
                                    direction="column"
                                    gap="20px"
                                    wrap="wrap"
                                    justifyContent="center"
                                    margin="large"
                                    searchNoResultsFound={
                                        <Flex justifyContent="center">
                                            <Text> No existen unidades </Text>
                                        </Flex>
                                    }
                                >
                                    {(item, index) => (
                                        <View
                                            key={index}
                                            borderRadius="medium"
                                            gap="2rem"
                                            padding="large"
                                            backgroundColor={
                                                index === unitIndex ?
                                                    tokens.colors.background.secondary : 
                                                    tokens.colors.background.tertiary
                                            }
                                            onClick={() => setUnitIndex(index)}
                                            className="action"
                                        >
                                            <Flex direction="row" justifyContent="space-between" alignItems="center">
                                                <StorageImage alt={item.title} imgKey={item.poster} accessLevel="guest" height="50px" />
                                                <Heading width="50%" level={5}>{item.title}</Heading>
                                                <Loader
                                                    size="medium"
                                                    percentage={getUnitProgress(index)}
                                                    isDeterminate
                                                    emptyColor={tokens.colors.background.primary}
                                                    margin="large"
                                                />
                                            </Flex>
                                        </View>
                                    )}
                                </Collection>
                            </Card>
                            <Divider orientation="vertical" />
                            <Card width="60%" padding="small">
                                <Heading level={4} margin="large">Completa los pasos</Heading>
                                <Collection
                                    items={program.Units.items[unitIndex].Steps.items}
                                    type="list"
                                    direction="row"
                                    rowGap="10px"
                                    columnGap="20px"
                                    wrap="wrap"
                                    justifyContent="center"
                                    margin="large"
                                    isPaginated
                                    itemsPerPage={20}
                                    isSearchable
                                    searchPlaceholder="Buscar el paso"
                                    searchNoResultsFound={
                                        <Flex justifyContent="center">
                                            <Text> No existen pasos </Text>
                                        </Flex>
                                    }
                                >
                                    {(item, index) => (
                                        <View
                                            key={index}
                                            borderRadius="medium"
                                            maxWidth="12rem"
                                            gap="2rem"
                                            padding="large"
                                            backgroundColor={tokens.colors.background.secondary}
                                            onClick={() => handleStepClick(index)}
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
                                                <StorageImage alt={item.title} imgKey={item.poster} accessLevel="guest" />
                                                <Heading level={5}>{item.title}</Heading>
                                                <Loader
                                                    size="large"
                                                    variation="linear"
                                                    percentage={
                                                        progresses[unitIndex][index].progress === null ? 0 : 
                                                            parseInt(progresses[unitIndex][index].progress * 100)
                                                    }
                                                    isPercentageTextHidden={progresses[unitIndex][index].progress > 0.99}
                                                    isDeterminate
                                                    emptyColor={tokens.colors.background.primary}
                                                    margin="medium"
                                                />
                                            </Flex>
                                        </View>
                                    )}
                                </Collection>
                            </Card>
                        </Flex>
                    </Card>
                ) : (
                    <Card>
                        <Text>No tienes acceso a este curso</Text>
                        <Button margin="large">Explorar cursos</Button>
                    </Card>
                )
            }
            <ThemeProvider theme={darkTheme}>
                <MeetingProvider>
                    <MeetingForm />
                    <Meeting />
                </MeetingProvider>
            </ThemeProvider>
            {
                program && isStepOpen && (
                    <Step
                        isOpen={isStepOpen}
                        onClose={handleStepClose}
                        stepInfo={program.Units.items[unitIndex].Steps.items[stepIndex]}
                        progress={progresses[unitIndex][stepIndex]}
                        seeked={seeked}
                        onPreviousNext={handlePreviousNextStepClick}
                        hasPrevious={stepIndex !== 0}
                        hasNext={program.Units.items[unitIndex].Steps.items.length > stepIndex + 1}
                    />
                )
            }
        </Flex>
    )

}

export default withAuthenticator(Actividades);

export async function getStaticProps() {
    return {
        props: {
            isPassedToWithAuthenticator: true,
        },
    };
}