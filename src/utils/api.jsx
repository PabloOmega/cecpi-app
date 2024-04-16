//import { graphqlOperation } from 'aws-amplify';
import { generateClient } from "aws-amplify/api";
import { createAttendee, createMeeting, deleteMeeting, deleteAttendee, createMessage, deleteMessage, updateAttendee } from '../graphql/mutations';
import { onCreateMessage, onUpdateAttendee } from '../graphql/subscriptions'
import {
    createChimeMeeting,
    getAttendee,
    endChimeMeeting,
    getMeeting,
    listMeetings,
    joinChimeMeeting,
    listAttendees,
    listMessages,
    createAppInstance,
    createAppInstanceUser,
    createChannel,
    joinChannel,
    sendMessage,
    getMessagingEndpoint,
    recordMeeting,
    generateRecordFile,
    stopRecordMeeting,
} from '../graphql/queries';

const client = generateClient();

export async function createMeetingLambda(meetingId, attendeeName, region) {
    const joinInfo = await client.graphql({
        query: createChimeMeeting,
        variables: { externalMeetingId: meetingId, name: attendeeName, region: region },
        authMode: 'userPool'
    });
    //const joinInfo = await client.graphql(graphqlOperation(createChimeMeeting, { title: title, name: attendeeName, region: region }));
    const joinInfoJson = joinInfo.data.createChimeMeeting;
    const joinInfoJsonParse = JSON.parse(joinInfoJson.body);
    return joinInfoJsonParse;
}

export async function joinMeetingLambda(chimeMeetingId, name) {
    const joinInfo = await client.graphql({
        query: joinChimeMeeting,
        variables: { meetingId: chimeMeetingId, name: name },
        authMode: 'userPool'
    });
    //const joinInfo = await client.graphql(graphqlOperation(joinChimeMeeting, { meetingId: meetingId, name: name }));
    const joinInfoJson = joinInfo.data.joinChimeMeeting;
    const joinInfoJsonParse = JSON.parse(joinInfoJson.body);
    return joinInfoJsonParse;
}

export async function endMeetingLambda(chimeMeetingId, meetingId) {
    const endInfo = await client.graphql({
        query: endChimeMeeting,
        variables: { meetingId: chimeMeetingId },
        authMode: 'userPool'
    });
    //const endInfo = await client.graphql(graphqlOperation(endChimeMeeting, { meetingId: meetingId }));
    const endInfoJson = endInfo.data.endChimeMeeting;
    await client.graphql({
        query: deleteMeeting,
        variables: { input: { id: meetingId } },
    });
    //await client.graphql(graphqlOperation(deleteMeetingGraphQL, { input: { title: meetingId } }));
    const attendees = await client.graphql({
        query: listAttendees,
        variables: {
            filter: { meetingID: { eq: meetingId } }
        }
    }).then((attendeesData) => {
        return attendeesData.data.listAttendees.items;
    })

    attendees.forEach(async (attendee) => {
        await client.graphql({
            query: deleteAttendee,
            variables: { input: { attendeeId: attendee.attendeeId } },
        });
    })

    const messages = await client.graphql({
        query: listMessages,
        variables: {
            filter: { meetingID: { eq: meetingId } }
        }
    }).then((messagesData) => {
        return messagesData.data.listMessages.items;
    })

    messages.forEach(async (message) => {
        await client.graphql({
            query: deleteMessage,
            variables: { input: { id: message.id } },
        });
    })

    return endInfoJson;
}

export async function addMeetingToDB(title, meetingId, meetingData) {
    await client.graphql({
        query: createMeeting,
        variables: { input: { title: title, meetingId: meetingId, data: meetingData, } },
    });
    //await client.graphql(graphqlOperation(createMeetingGraphQL, { input: { title: title, meetingId: meetingId, data: meetingData, } }));
}

export async function deleteMeetingDB(meetingId) {

    await client.graphql({
        query: deleteMeeting,
        variables: { input: { id: meetingId } },
    });
    //await client.graphql(graphqlOperation(deleteMeetingGraphQL, { input: { title: meetingId } }));
    const attendees = await client.graphql({
        query: listAttendees,
        variables: {
            filter: { meetingID: { eq: meetingId } }
        }
    }).then((attendeesData) => {
        return attendeesData.data.listAttendees.items;
    })

    attendees.forEach(async (attendee) => {
        await client.graphql({
            query: deleteAttendee,
            variables: { input: { attendeeId: attendee.attendeeId } },
        });
    })
}

export async function addAttendeeToDB(attendeeData, student, meetingId) {
    await client.graphql({
        query: createAttendee,
        variables: {
            input:
            {
                attendeeId: attendeeData.AttendeeId,
                name: student.name,
                data: JSON.stringify(attendeeData),
                raisedHand: false,
                attendeeStudentId: student.id,
                meetingID: meetingId
            }
        },
    });
    //await client.graphql(graphqlOperation(createAttendeeGraphQL, { input: { attendeeId: attendeeID, name: attendeeName } }));
}

export async function listMeetingsFromDB(meetingId) {
    const attendeeInfo = await client.graphql({
        query: listMeetings,
        variables: {
            filter: {
                meetingId: {
                    eq: meetingId
                }
            }
        }
    });
    //const attendeeInfo = await client.graphql(graphqlOperation(getAttendee, { attendeeId: attendeeId }));
    return attendeeInfo;
}

export async function getMeetingFromDB(title) {
    const meetingInfo = await client.graphql({
        query: getMeeting,
        variables: { title: title }
    });
    //const meetingInfo = await client.graphql(graphqlOperation(getMeeting, { title: title }));
    return meetingInfo;
}

export async function getAttendeeFromDB(attendeeId) {
    const attendeeInfo = await client.graphql({
        query: getAttendee,
        variables: { attendeeId: attendeeId }
    });
    //const attendeeInfo = await client.graphql(graphqlOperation(getAttendee, { attendeeId: attendeeId }));
    return attendeeInfo;
}

export async function createAppMessaging(name) {
    const appInstanceInfo = await client.graphql({
        query: createAppInstance,
        variables: { name },
        authMode: 'userPool'
    });
    //const joinInfo = await client.graphql(graphqlOperation(createChimeMeeting, { title: title, name: attendeeName, region: region }));
    const appInstanceJson = appInstanceInfo.data.createAppInstance;
    const appInstanceParse = JSON.parse(appInstanceJson.body);
    return appInstanceParse;
}

export async function createAppUser(userId, name) {
    const appUserInfo = await client.graphql({
        query: createAppInstanceUser,
        variables: { userId, name },
        authMode: 'userPool'
    });
    //const joinInfo = await client.graphql(graphqlOperation(createChimeMeeting, { title: title, name: attendeeName, region: region }));
    const appUserJson = appUserInfo.data.createAppInstanceUser;
    const appUserParse = JSON.parse(appUserJson.body);
    return appUserParse;
}

export async function createChannelLambda(userArn, channelName) {
    const channelInfo = await client.graphql({
        query: createChannel,
        variables: { chimeBearer: userArn, name: channelName, mode: "UNRESTRICTED", privacy: "PUBLIC", moderatorArn: userArn },
        authMode: 'userPool'
    });

    return JSON.parse(channelInfo.data.createChannel.body);
}

export async function joinChannelLambda(userArn, channelArn) {
    const joinInfo = await client.graphql({
        query: joinChannel,
        variables: { chimeBearer: userArn, channelArn, Type: "DEFAULT" },
        authMode: 'userPool'
    });

    return JSON.parse(joinInfo.data.joinChannel.body);
}

export async function sendMessageLambda(userArn, channelArn, content) {
    const messageInfo = await client.graphql({
        query: sendMessage,
        variables: { chimeBearer: userArn, channelArn, content, persistence: "PERSISTENT", Type: "STANDARD" },
        authMode: 'userPool'
    });

    return JSON.parse(messageInfo.data.sendMessage.body);
}

export async function getEndpointLambda() {
    const endpoint = await client.graphql({
        query: getMessagingEndpoint,
        variables: { },
        authMode: 'userPool'
    });

    return JSON.parse(endpoint.data.getMessagingEndpoint.body);
}

export async function subscribeMessagesDB(meetingId, onCreate, onError) {
    await client.graphql({
        query: onCreateMessage,
        variables: {
            filter:
            {
                meetingID: { eq: meetingId }
            }
        },
    })
        .subscribe({
            next: ({ data }) => onCreate(data),
            error: (error) => onError(error)
        });
}

export async function sendMessageDB(content, senderName, attendeeID, meetingID, type = "MESSAGE", receiverID = "") {
    await client.graphql({
        query: createMessage,
        variables: {
            input:
            {
                content,
                attendeeID,
                meetingID,
                senderName,
                type,
                receiverID
            }
        },
    });
}

export async function subscribeAttendeeDB(meetingId, onUpdate, onError) {
    return await client.graphql({
        query: onUpdateAttendee,
        variables: {
            filter:
            {
                meetingID: { eq: meetingId }
            }
        },
    })
        .subscribe({
            next: ({ data }) => onUpdate(data),
            error: (error) => onError(error)
        });
}

export async function unsubscribeAttendeeDB(sub) {
    await sub.unsubscribe();
}

export async function recordMeetingLambda(meetingArn, folderName) {
    const mediaPipeline = await client.graphql({
        query: recordMeeting,
        variables: { meetingArn, folderName },
        authMode: 'userPool'
    });
    //const joinInfo = await client.graphql(graphqlOperation(createChimeMeeting, { title: title, name: attendeeName, region: region }));
    const mediaPipelineJson = mediaPipeline.data.recordMeeting;
    const mediaPipelineJsonParse = JSON.parse(mediaPipelineJson.body);
    return mediaPipelineJsonParse;
}

export async function generateFileRecordLambda(mediaPipelineArn, folderName) {
    const mediaConcatenationPipeline = await client.graphql({
        query: generateRecordFile,
        variables: { mediaPipelineArn, folderName },
        authMode: 'userPool'
    });
    //const joinInfo = await client.graphql(graphqlOperation(createChimeMeeting, { title: title, name: attendeeName, region: region }));
    const mediaConcatenationPipelineJson = mediaConcatenationPipeline.data.generateRecordFile;
    const mediaConcatenationPipelineJsonParse = JSON.parse(mediaConcatenationPipelineJson.body);
    return mediaConcatenationPipelineJsonParse;
}

export async function stopRecordMeetingLambda(mediaPipelineId) {
    await client.graphql({
        query: stopRecordMeeting,
        variables: { mediaPipelineId },
        authMode: 'userPool'
    });
}






