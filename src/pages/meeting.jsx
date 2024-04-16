import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Flex,
    Card,
    Heading,
    Text,
    SelectField,
    withAuthenticator,
    Divider,
    Button,
    Collection,
    View,
    Icon,
    useTheme
} from '@aws-amplify/ui-react';
import {
    AudioInputControl,
    AudioOutputControl,
    ContentShareControl,
    ControlBar,
    ControlBarButton,
    Phone,
    Information,
    Attendees,
    Chat,
    Record,
    useMeetingManager,
    MeetingStatus,
    useMeetingStatus,
    VideoTileGrid,
    LeaveMeeting,
    BackgroundBlurProvider,
    VideoInputBackgroundBlurControl,
    Navbar,
    NavbarHeader,
    NavbarItem,
    MicrophoneActivity,
    Badge,
    Roster,
    RosterGroup,
    RosterHeader,
    RosterCell,
    RosterAttendee,
    PopOver,
    PopOverHeader,
    PopOverSeparator,
    PopOverItem,
    PopOverSubMenu,
    Flex as ChimeFlex,
    useRosterState,
    useToggleLocalMute,
    useLocalVideo,
    HandRaise,
} from 'amazon-chime-sdk-component-library-react';
import { generateClient } from "aws-amplify/api";
import {
    createMeetingLambda,
    joinMeetingLambda,
    endMeetingLambda,
    deleteMeetingDB,
    getAttendeeFromDB,
    addAttendeeToDB,
    subscribeAttendeeDB,
    recordMeetingLambda,
    generateFileRecordLambda,
    stopRecordMeetingLambda,
    subscribeMessagesDB,
    sendMessageDB,
} from '../utils/api';
import { updateMeeting, updateAttendee } from "../graphql/mutations";
import MeetingChat from "./MeetingChat"
import MeetingInformation from "../components/MeetingInformation"

import { ThemeProvider } from 'styled-components';
import {
    darkTheme
} from 'amazon-chime-sdk-component-library-react';
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';

const client = generateClient();

const buildCustomQueryMeeting = (studentId) => {
    return /* GraphQL */ `
    query GetMeeting($id: ID!) {
        getMeeting(id: $id) {
            id
            title
            data
            date
            time
            description
            programID
            Attendees(filter: {attendeeStudentId: {eq: "${studentId}"}}) {
                items {
                    attendeeId
                    name
                    data
                }
                nextToken
                __typename
            }
            createdAt
            updatedAt
            __typename
        }
    }
    `;    
}

const buildCustomQueryStudents = (programId) => {
    return /* GraphQL */ `
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
            Programs(filter: {programId: {eq: "${programId}"}}) {
                items {
                    program {
                        instructors {
                            items {
                                instructor {
                                    userId
                                    name
                                }
                            }
                        }
                        name
                        id
                    }
                }
            }
            }
            nextToken
            __typename
        }
    }
    `;
}

const Meeting = ({ isPassedToWithAuthenticator, signOut, user }) => {
    const [program, setProgram] = useState({});
    const [student, setStudent] = useState({});
    const [meeting, setMeeting] = useState({});
    const [attendee, setAttendee] = useState({});
    const [isJoined, setJoined] = useState(false);
    const [isInstructor, setIsInstructor] = useState({});
    const [showInformation, setShowInformation] = useState(false);
    const [showRoster, setShowRoster] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [recording, setRecording] = useState(false);
    const [search, setSearch] = useState('');
    const [messages, setMessages] = useState([]);
    const [messagesCount, setMessagesCount] = useState(0);
    const [raisedHand, setRaisedHand] = useState(false);
    const [attendeeSubscriber, setAttendeeSubscriber] = useState();
    const [remoteAttendees, setRemoteAttendees] = useState([]);

    const { programId, meetingId } = useParams();
    const navigate = useNavigate();
    const { tokens } = useTheme();

    const meetingManager = useMeetingManager();
    const meetingStatus = useMeetingStatus();
    const { roster } = useRosterState();
    const { muted, toggleMute } = useToggleLocalMute();
    const { tileId, isVideoEnabled, setIsVideoEnabled, hasReachedVideoLimit, toggleVideo } = useLocalVideo();

    useEffect(() => {
        checkUserId();
        meetingManager.getAttendee = getAttendeeCallback();
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
            query: buildCustomQueryStudents(programId),
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

        if (!students[0].Programs.items.length) {
            console.log("No inscrito");
            return;
        }

        await setStudent(students[0]);

        await readProgram(students[0].Programs.items[0].program);

        await readMeeting(students[0]);

        setTimeout(() => setShowChat(true), 3000);
        setTimeout(() => setShowChat(false), 6000);
    }

    async function readProgram(program) {
        setProgram(program);
        setIsInstructor(program.instructors.items.find(instructor => instructor.instructor.userId === user.userId));
    }

    async function readMeeting(student) {

        await client.graphql({
            query: buildCustomQueryMeeting(student.id),
            variables: { id: meetingId }
        }).then((meetingData) => {
            setMeeting(meetingData.data.getMeeting);
            if (meetingData.data.getMeeting.Attendees.items.length) {
                setAttendee(meetingData.data.getMeeting.Attendees.items[0])
            }
        }).catch((error) => {
            console.log(error);
            console.log('error fetching meetings');
        });

    }

    async function checkMeeting() {
        if (meetingStatus === MeetingStatus.Ended) {
            await deleteMeetingDB(meetingId);
            navigate(`/calendario/${student.id}/${programId}`);
        }
    }


    function getAttendeeCallback() {
        return async (chimeAttendeeId, externalUserId) => {
            const attendeeInfo = await getAttendeeFromDB(chimeAttendeeId);
            const attendeeData = attendeeInfo.data.getAttendee;
            return {
                /*name: attendeeData.name*/
                name: "Pablo Navarrete"
            };
        }
    }

    async function updateRaisedHandDB() {
        await client.graphql({
            query: updateAttendee,
            variables: { input: { attendeeId: attendee.attendeeId, raisedHand }
            },
        });
    }

    async function updateMeetingDataDB() {
        await client.graphql({
            query: updateMeeting,
            variables: { input: { id: meetingId, data: meeting.data } }
        });
    }

    async function updateMeetingMediaCaptureDataDB() {
        await client.graphql({
            query: updateMeeting,
            variables: { input: { id: meetingId, data: meeting.mediaCaptureData } }
        });
    }

    

    function onAttendeeUpdated(data) {
        const newRemoteAttendee = data.onUpdateAttendee;
        const remoteAttendeeIndex = remoteAttendees.findIndex(attendee => attendee.attendeeId === newRemoteAttendee.attendeeId)
        if (remoteAttendeeIndex === -1) {
            newRemoteAttendee.raisedHand = true;
            remoteAttendees.push(newRemoteAttendee);
        }
        else remoteAttendees[remoteAttendeeIndex] = newRemoteAttendee;
        
        setRemoteAttendees(remoteAttendees);
    }

    async function createMeeting() {

        const joinInfo = await createMeetingLambda(meetingId, student.name, 'us-east-1');
        meeting.data = JSON.stringify(joinInfo.Meeting);

        await setMeeting(meeting);
        await setJoined(true);
        await setAttendee(
            {
                attendeeId: joinInfo.Attendee.AttendeeId,
                name: student.name,
                data: JSON.stringify(joinInfo.Attendee),
                attendeeStudentId: student.id,
                meetingID: meetingId
            }
        );

        const meetingSessionConfiguration = new MeetingSessionConfiguration(joinInfo.Meeting, joinInfo.Attendee);
        await meetingManager.join(meetingSessionConfiguration);
        await meetingManager.start();

        await updateMeetingDataDB();
        await addAttendeeToDB(joinInfo.Attendee, student, meetingId);

        const attendeeSubscriber = await subscribeAttendeeDB(meetingId,
            onAttendeeUpdated,
            (error) => console.warn(error)            
        )

        //await subscribeMessagesDB(meeting.id,
        //    handleOnMessageReceived,
        //    (error) => console.warn(error)
        //);

        setAttendeeSubscriber(attendeeSubscriber);
    }

    async function joinMeeting() {

        let meetingSessionConfiguration;
        if (attendee) {
            meetingSessionConfiguration = new MeetingSessionConfiguration(JSON.parse(meeting.data), JSON.parse(attendee.data));
        } else {
            const joinInfo = await joinMeetingLambda(JSON.parse(meeting.data).MeetingId, student.name);
            meetingSessionConfiguration = new MeetingSessionConfiguration(JSON.parse(meeting.data), joinInfo.Attendee);
            await addAttendeeToDB(joinInfo.Attendee, student, meetingId);

            await setAttendee(
                {
                    attendeeId: joinInfo.Attendee.AttendeeId,
                    name: student.name,
                    data: JSON.stringify(joinInfo.Attendee),
                    attendeeStudentId: student.id,
                    meetingID: meetingId
                }
            );
        }

        await setJoined(true);

        await meetingManager.join(meetingSessionConfiguration);
        await meetingManager.start();

        await checkMeeting();

        if (meeting.mediaCaptureData) setRecording(true);

        const attendeeSubscriber = await subscribeAttendeeDB(meetingId,
            onAttendeeUpdated,
            (error) => console.warn(error)
        )

        //await subscribeMessagesDB(meeting.id,
        //    handleOnMessageReceived,
        //    (error) => console.warn(error)
        //);

        setAttendeeSubscriber(attendeeSubscriber);
    }

    async function leaveMeeting() {
        await meetingManager.leave();
        await setJoined(false);

        await attendeeSubscriber.unsubscribe();
        setRemoteAttendees([]);
    }

    async function endMeeting() {
        await endMeetingLambda(meetingManager.meetingId, meetingId);
        await meetingManager.leave();

        await attendeeSubscriber.unsubscribe();
        navigate(`/calendario/${student.id}/${programId}`);
    }

    async function recordMeeting() {
        const recordingFolder = `/${program.id}/${meeting.id}`

        const mediaCaptureData = await recordMeetingLambda(JSON.parse(meeting.data).MeetingArn, recordingFolder);
        await generateFileRecordLambda(mediaCaptureData.MediaCapturePipeline.MediaPipelineArn, recordingFolder);

        meeting.mediaCaptureData = JSON.stringify(mediaCaptureData.MediaCapturePipeline);
        await setMeeting(meeting);
        await updateMeetingMediaCaptureDataDB();
    }

    async function stopRecordMeeting() {
        await stopRecordMeetingLambda(JSON.parse(meeting.mediaCaptureData).MediaPipelineId);

        meeting.mediaCaptureData = "";
        await setMeeting(meeting);
        await updateMeetingMediaCaptureDataDB();
    }

    function processActions(action) {
        if (action.receiverID === attendee.attendeeId || !action.receiverID) {
            switch (action.content) {
                case "MUTE":
                    console.log(action, muted);
                    if (!muted) toggleMute();
                    break;
                case "DISABLE_CAMERA":
                    if (isVideoEnabled) toggleVideo();
                    break;
                case "LOWER_HAND":
                    if (raisedHand) handleOnRaisedHand();
                    break;
            }
        }
    }

    const handleOnChatClose = (messages) => {
        setMessages(messages);
        setMessagesCount(0);
        setShowChat(false);
    }

    const handleOnMessageReceived = (newMessage) => {
        //const newMessage = data.onCreateMessage;
        switch (newMessage.type) {
            case "MESSAGE":
                setMessages(prevMessages => {
                    if (prevMessages.find((message) => message.id === newMessage.id)) return prevMessages;
                    setMessagesCount(prevCount => prevCount + 1);
                    return [...prevMessages, newMessage];
                });
                break;
            case "ACTION":
                processActions(newMessage);
                break;
        }

    }

    const handleOnRaisedHand = async () => {
        await setRaisedHand(prevRaisedHand => !prevRaisedHand);
        await updateRaisedHandDB();
    }

    const isRemoteRaisedHand = (remoteId) => {
        const remoteAttendee = remoteAttendees.find(attendee => attendee.attendeeId === remoteId);
        return remoteAttendee ? remoteAttendee.raisedHand : false;
    }

    const handleRecordButtonOnClick = () => {
        recording ? stopRecordMeeting() : recordMeeting();
        setRecording(prevRecording => !prevRecording);
    }

    const handleAttendeeActionOnClick = async (action, receiverId = "") => {
        await sendMessageDB(action, attendee.name, attendee.attendeeId, meeting.id, "ACTION", receiverId);
    }

    function DeviceSettings() {
        switch (meetingStatus) {
            case MeetingStatus.Succeeded:
                return (
                    <ControlBar
                        layout="undocked-horizontal"
                        showLabels
                    >
                        <ControlBarButton
                            icon={<HandRaise isRaised={raisedHand} />}
                            onClick={handleOnRaisedHand}
                            label="Levantar Mano"
                        />
                        <ControlBarButton
                            icon={<MicrophoneActivity attendeeId={attendee.attendeeId} />}
                            onClick={toggleMute}
                            label="Micrófono"
                        />
                        <VideoInputBackgroundBlurControl backgroundBlurLabel="Desenfocar de fondo" />
                        <AudioOutputControl />
                        <ContentShareControl />
                        {isInstructor && 
                            <ControlBarButton icon={<Phone />} onClick={endMeeting} label="End" />
                        }
                    </ControlBar>
                );
            case MeetingStatus.Ended:
                return (
                    <Text>La reunión ha finalizado</Text>
                )
            default:
                return (
                    <Text>Ha ocurrido un error</Text>
                )

        }
    }

    function LeftBar() {
        switch (meetingStatus) {
            case MeetingStatus.Succeeded:
                return (
                    <Navbar flexDirection="column" height="10%" >
                        <NavbarHeader onClose={() => { }} />
                        <ChimeFlex>
                            <NavbarItem
                                icon={<Information />}
                                onClick={() => setShowInformation(true)}
                                label="Información"
                                showLabel
                            />
                            <NavbarItem
                                icon={<Attendees />}
                                onClick={() => setShowRoster(true)}
                                label="Asistentes"
                                badge={(!showRoster && !showChat && !showInformation) && <Badge value={Object.values(roster).length} />}
                                showLabel
                            />
                            <NavbarItem
                                icon={<Chat />}
                                onClick={() => setShowChat(true)}
                                label="Chat"
                                badge={(!showRoster && !showChat && !showInformation) && <Badge value={messagesCount} />}
                                showLabel
                            />
                            <NavbarItem
                                icon={<Record />}
                                onClick={isInstructor && handleRecordButtonOnClick}
                                label={isInstructor ? "Grabar Reunión" : (recording ? "Grabando" : "No se esta grabando" )}
                                selected={recording}
                                showLabel
                            />
                        </ChimeFlex>
                        <ChimeFlex marginTop="auto">
                            <NavbarItem
                                icon={<LeaveMeeting />}
                                onClick={leaveMeeting}
                                label="Salir"
                                showLabel
                            />
                        </ChimeFlex>
                    </Navbar>
                );
            case MeetingStatus.Ended:
                return (
                    <Text>La reunión ha finalizado</Text>
                )
            default:
                return (
                    <Text>Ha ocurrido un error</Text>
                )

        }
    }

    function AttendeesStatus() {
        switch (meetingStatus) {
            case MeetingStatus.Succeeded:
                return (
                    <Roster
                        style={{ position: "relative", top: "-100%", left: "0%" }}
                    >
                        <RosterHeader
                            title="Asistentes"
                            badge={Object.values(roster).length}
                            onClose={() => setShowRoster(false)}
                            searchValue={search}
                            onSearch={(e) => { e.preventDefault(); setSearch(e.target.value) }}
                            a11yMenuLabel="Opciones de Roster"
                            menu={isInstructor &&
                                (
                                    <>
                                        <PopOverItem
                                            as="button"
                                            onClick={() => handleAttendeeActionOnClick("MUTE")}
                                        >
                                            Silenciar a todos
                                        </PopOverItem>
                                    </>
                                )
                            }
                        />
                        <RosterGroup>
                            {
                                Object.values(roster).map((chimeAttendee) => {
                                    if (search && !chimeAttendee.name.toLowerCase().startsWith(search.toLowerCase())) return;
                                    return (
                                        <RosterAttendee
                                            key={chimeAttendee.chimeAttendeeId}
                                            attendeeId={chimeAttendee.chimeAttendeeId}
                                            extraIcon={isRemoteRaisedHand(chimeAttendee.chimeAttendeeId) && <HandRaise isRaised={true} />}
                                            menu={isInstructor &&
                                                (
                                                    <div>
                                                        <PopOverItem
                                                            as="button"
                                                            onClick={
                                                                () => handleAttendeeActionOnClick("MUTE", chimeAttendee.chimeAttendeeId)
                                                            }
                                                        >
                                                            Silenciar
                                                        </PopOverItem>
                                                        {isRemoteRaisedHand(chimeAttendee.chimeAttendeeId) &&
                                                        <PopOverItem
                                                            as="button"
                                                            onClick={
                                                                () => handleAttendeeActionOnClick("LOWER_HAND", chimeAttendee.chimeAttendeeId)
                                                            }
                                                        >
                                                            Bajar mano
                                                        </PopOverItem>
                                                        }
                                                    </div>
                                                )
                                            }
                                        />
                                    )
                                })
                            }
                        </RosterGroup>
                    </Roster>
                );
            case MeetingStatus.Ended:
                return (
                    <Text>La reunión ha finalizado</Text>
                )
            default:
                return (
                    <Text>Ha ocurrido un error</Text>
                )

        }
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Flex direction="column">
                <Heading level={2}>{program ? program.name : " "}</Heading>
                {
                    (student && program) ? (
                        <Card as="section">
                            {meeting ? (
                                <Card>
                                    <Heading level={5}>{meeting.title}</Heading>
                                    {meeting.data ? (
                                        <Card>
                                            {isJoined ? (
                                                <div
                                                    style={
                                                        {
                                                            marginTop: '2rem',
                                                            height: '40rem',
                                                            display: 'block'
                                                        }
                                                    }
                                                >
                                                    <ChimeFlex flexDirection="row" layout="fill-space-centered">
                                                        <LeftBar />
                                                        <ChimeFlex flexDirection="column" layout="fill-space">
                                                            <BackgroundBlurProvider>
                                                                <VideoTileGrid
                                                                    noRemoteVideoView={<Text>Nadie tiene activado su video</Text>}
                                                                />
                                                                <DeviceSettings />
                                                            </BackgroundBlurProvider>
                                                        </ChimeFlex>
                                                    </ChimeFlex>
                                                    {showRoster && <AttendeesStatus />}
                                                    {showChat && (
                                                        <MeetingChat
                                                            isOpen={showChat}
                                                            onClose={handleOnChatClose}
                                                            meeting={meeting}
                                                            attendee={attendee}
                                                            prevMessages={messages}
                                                            onMessageReceived={handleOnMessageReceived}
                                                        />
                                                    )
                                                    }
                                                    {showInformation && (
                                                        <MeetingInformation
                                                            isOpen={showInformation}
                                                            onClose={() => setShowInformation(false)}
                                                            meeting={meeting}
                                                        />
                                                    )
                                                    }
                                                </div>
                                            ) : (
                                                <Button variation="primary" onClick={joinMeeting}>Unirse a la reunión</Button>
                                            )}
                                        </Card>
                                    ) : (
                                        <Text>La reunión no se ha iniciado. Espere a que el instructor inicie.</Text>
                                    )}
                                </Card>
                            ) : (
                                <Text>Cargando reunión</Text>
                            )}
                            <Card>
                                <Flex direction="row" alignItems="center" justifyContent="center">
                                    {isInstructor && meeting && (
                                        meeting.data ? (
                                            <Text>No se puede iniciar reunión</Text>
                                        ) : (
                                            <Card>
                                                {!isJoined && (
                                                    <Button variation="primary" onClick={createMeeting}>Iniciar Reunión</Button>
                                                )}
                                            </Card>
                                        ))}
                                </Flex>
                            </Card>
                        </Card>
                    ) : (
                        <Card>
                            <Text>No tienes acceso a este curso</Text>
                            <Button margin="large">Explorar cursos</Button>
                        </Card>
                    )
                }
            </Flex>        
        </ThemeProvider>
    );

};

export default withAuthenticator(Meeting);