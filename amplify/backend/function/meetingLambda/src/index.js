/* Amplify Params - DO NOT EDIT
  API_CHIME_GRAPHQLAPIENDPOINTOUTPUT
  API_CHIME_GRAPHQLAPIIDOUTPUT
  API_CHIME_GRAPHQLAPIKEYOUTPUT
  ENV
  REGION
Amplify Params - DO NOT EDIT */

const { ChimeSDKMeetings } = require('@aws-sdk/client-chime-sdk-meetings');
const {
    ChimeSDKIdentityClient,
    CreateAppInstanceCommand,
    CreateAppInstanceUserCommand,
} = require("@aws-sdk/client-chime-sdk-identity");
const {
    ChimeSDKMessagingClient,
    CreateChannelCommand,
    CreateChannelMembershipCommand,
    SendChannelMessageCommand,
    GetMessagingSessionEndpointCommand
} = require("@aws-sdk/client-chime-sdk-messaging");
const {
    ChimeSDKMediaPipelinesClient,
    CreateMediaCapturePipelineCommand,
    CreateMediaConcatenationPipelineCommand,
    DeleteMediaCapturePipelineCommand,
} = require("@aws-sdk/client-chime-sdk-media-pipelines");

const chimeIdentity = new ChimeSDKIdentityClient({ region: 'us-east-1' });
const chimeMessaging = new ChimeSDKMessagingClient({ region: 'us-east-1' });
const chimeMediaPipeline = new ChimeSDKMediaPipelinesClient({ region: 'us-east-1' });
const chime = new ChimeSDKMeetings({ region: 'us-east-1' });

const { USE_EVENT_BRIDGE, SQS_QUEUE_ARN } = process.env;

// Create a unique id
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function response(statusCode, contentType, body) {
    return {
        statusCode: statusCode,
        headers: { 'Content-Type': contentType },
        body: body,
        isBase64Encoded: false
    };
}

const createChimeMeeting = async (context) => {
    const externalMeetingId = context.arguments.externalMeetingId;
    const region = context.arguments.region || 'us-east-1';
    const name = context.arguments.name;

    if (!externalMeetingId || !name) {
        return response(400, 'application/json', JSON.stringify({
            error: 'Required properties: meeting title, name'
        }));
    }
    const request = {
        ClientRequestToken: uuid(),
        MediaRegion: region,
        NotificationsConfiguration: USE_EVENT_BRIDGE === 'false' ? { SqsQueueArn: SQS_QUEUE_ARN } : {},

        // Any meeting ID you wish to associate with the meeting.
        // For simplicity here, we use the meeting title.
        ExternalMeetingId: externalMeetingId,
        Tags: [
            { Key: 'Department', Value: 'RND' }
        ]
    };
    console.info('Creating new chime meeting: ' + JSON.stringify(request));
    let meetingInfo = await chime.createMeeting(request);

    console.info('Adding new attendee');
    const attendeeInfo = (await chime.createAttendee({
        MeetingId: meetingInfo.Meeting.MeetingId,

        // Any user ID you wish to associate with the attendeee.
        // For simplicity here, we use a random UUID for uniqueness
        // combined with the name the user provided, which can later
        // be used to help build the roster.
        ExternalUserId: `${uuid().substring(0, 8)}#${name}`.substring(0, 64),
    }));

    return response(200, 'application/json', JSON.stringify(
        {
            Meeting: meetingInfo.Meeting,
            Attendee: attendeeInfo.Attendee,
        }, null, 2));
};

const joinChimeMeeting = async (context) => {
    const meetingId = context.arguments.meetingId;
    const name = context.arguments.name;

    if (!meetingId || !name) {
        return response(400, 'application/json', JSON.stringify({
            error: 'Required properties: meeting Id, name'
        }));
    }

    console.info('Adding new attendee');
    const attendeeInfo = (await chime.createAttendee({
        MeetingId: meetingId,

        // Any user ID you wish to associate with the attendeee.
        // For simplicity here, we use a random UUID for uniqueness
        // combined with the name the user provided, which can later
        // be used to help build the roster.
        ExternalUserId: `${uuid().substring(0, 8)}#${name}`.substring(0, 64),
    }));

    return response(200, 'application/json', JSON.stringify(
        {
            Attendee: attendeeInfo.Attendee
        }, null, 2));
};

const endChimeMeeting = async (context) => {
    const meetingId = context.arguments.meetingId;
    await chime.deleteMeeting({ MeetingId: meetingId });
    console.log('Deleted Meeting: ' + meetingId);
    return response(200, 'application/json', JSON.stringify({}));
};

const createAppInstance = async (context) => {
    const name = context.arguments.name;

    if (!name) {
        return response(400, 'application/json', JSON.stringify({
            error: 'Required properties: application name'
        }));
    }
    const request = {
        ClientRequestToken: uuid(),
        Name: name,

        Tags: [
            { Key: 'Department', Value: 'RND' }
        ]
    };
    console.info('Creating new chime application: ' + JSON.stringify(request));
    const command = new CreateAppInstanceCommand(request);
    const appInstance = await chimeIdentity.send(command);

    return response(200, 'application/json', JSON.stringify(appInstance, null, 2));
}

const createAppInstanceUser = async (context) => {
    const appInstanceArn = "arn:aws:chime:us-east-1:449314745890:app-instance/fe04dd6d-e288-4802-8386-3796cc44b548";
    const appInstanceUserId = context.arguments.userId;
    const name = context.arguments.name;

    if (!appInstanceUserId && !name) {
        return response(400, 'application/json', JSON.stringify({
            error: 'Required properties: application user id, user name'
        }));
    }
    const request = {
        AppInstanceArn: appInstanceArn,
        AppInstanceUserId: appInstanceUserId,
        ClientRequestToken: uuid(),
        Name: name,
        ExpirationSettings: {
            ExpirationDays: 1,
            ExpirationCriterion: "CREATED_TIMESTAMP",
        },

        Tags: [
            { Key: 'Department', Value: 'RND' }
        ]
    };
    console.info('Creating new chime application user: ' + JSON.stringify(request));
    const command = new CreateAppInstanceUserCommand(request);
    const appInstanceUser = await chimeIdentity.send(command);

    return response(200, 'application/json', JSON.stringify(appInstanceUser, null, 2));
}

const createChannel = async (context) => {
    const AppInstanceArn = "arn:aws:chime:us-east-1:449314745890:app-instance/fe04dd6d-e288-4802-8386-3796cc44b548";
    const ChimeBearer = context.arguments.chimeBearer;
    const Name = context.arguments.name;
    const Mode = context.arguments.mode;
    const Privacy = context.arguments.privacy;
    const ModeratorArn = context.arguments.moderatorArn;

    if (!ChimeBearer && !Name) {
        return response(400, 'application/json', JSON.stringify({
            error: 'Required properties: user arn, name'
        }));
    }
    const request = {
        AppInstanceArn,
        ChimeBearer,
        ClientRequestToken: uuid(),
        Name,
        Mode,
        Privacy,
        MemberArns: [
            ModeratorArn,
        ],
        ModeratorArns: [
            ModeratorArn,
        ],
        ExpirationSettings: {
            ExpirationDays: 1,
            ExpirationCriterion: "CREATED_TIMESTAMP",
        },

        Tags: [
            { Key: 'Department', Value: 'RND' }
        ]
    };
    console.info('Creating new chime channel: ' + JSON.stringify(request));
    const command = new CreateChannelCommand(request);
    const channel = await chimeMessaging.send(command);

    return response(200, 'application/json', JSON.stringify(channel, null, 2));
}

const joinChannel = async (context) => {
    const ChannelArn = context.arguments.channelArn;
    const ChimeBearer = context.arguments.chimeBearer;
    const MemberArn = context.arguments.memberArn;
    const Type = context.arguments.type;

    if (!ChimeBearer && !ChannelArn) {
        return response(400, 'application/json', JSON.stringify({
            error: 'Required properties: channel arn, user arn'
        }));
    }
    const request = {
        ChannelArn,
        ChimeBearer,
        MemberArn: MemberArn ? MemberArn : ChimeBearer,
        Type,
    };
    console.info('Creating new chime member channel: ' + JSON.stringify(request));
    const command = new CreateChannelMembershipCommand(request);
    const channelMember = await chimeMessaging.send(command);

    return response(200, 'application/json', JSON.stringify(channelMember, null, 2));
}

const sendMessage = async (context) => {
    const ChannelArn = context.arguments.channelArn;
    const ChimeBearer = context.arguments.chimeBearer;
    const Content = context.arguments.content;
    const Persistence = context.arguments.persistence;
    const Type = context.arguments.type;

    if (!ChimeBearer && !ChannelArn) {
        return response(400, 'application/json', JSON.stringify({
            error: 'Required properties: channel arn, user arn'
        }));
    }
    const request = {
        ChannelArn,
        ChimeBearer,
        Content,
        Persistence,
        Type,
        ClientRequestToken: uuid(),
    };
    console.info('Send message: ' + JSON.stringify(request));
    const command = new SendChannelMessageCommand(request);
    const message = await chimeMessaging.send(command);

    return response(200, 'application/json', JSON.stringify(message, null, 2));
}

const getMessagingEndpoint = async (context) => {
    const request = { };
    console.info('Get Endpoint: ' + JSON.stringify(request));
    const command = new GetMessagingSessionEndpointCommand(request);
    const endpoint = await chimeMessaging.send(command);

    return response(200, 'application/json', JSON.stringify(endpoint, null, 2));
}

const recordMeeting = async (context) => {
    const SourceArn = context.arguments.meetingArn;
    const folderName = context.arguments.folderName || "";
    const bucketArn = "arn:aws:s3:::meet-recordings-cecpi/public/recordings" + folderName;

    if (!SourceArn) {
        return response(400, 'application/json', JSON.stringify({
            error: 'Required properties: MeetingArn'
        }));
    }
    const request = {
        SourceType: "ChimeSdkMeeting",
        SourceArn,
        SinkType: "S3Bucket",
        SinkArn: bucketArn,
        ClientRequestToken: uuid(),
        ChimeSdkMeetingConfiguration: {
            ArtifactsConfiguration: { // ArtifactsConfiguration
                Audio: { // AudioArtifactsConfiguration
                    MuxType: "AudioWithCompositedVideo", // required
                },
                Video: { // VideoArtifactsConfiguration 
                    State: "Disabled", // required VIDEO Y CONTENT DEBEN ESTAR DESHABILITADOS AL ACTIVAR COMPOSITEDVIDEO
                    MuxType: "VideoOnly",
                },
                Content: { // ContentArtifactsConfiguration
                    State: "Disabled", // required
                    MuxType: "ContentOnly",
                },
                CompositedVideo: { // CompositedVideoArtifactsConfiguration
                    Layout: "GridView",
                    Resolution: "HD",
                    GridViewConfiguration: { // GridViewConfiguration
                        ContentShareLayout: "Horizontal", // required
                        HorizontalLayoutConfiguration: { // HorizontalLayoutConfiguration
                            TileOrder: "SpeakerSequence",
                            TilePosition: "Bottom",
                            TileCount: 5,
                        },
                        VideoAttribute: { // VideoAttribute
                            CornerRadius: 2,
                            BorderColor: "Black",
                            HighlightColor: "White",
                            BorderThickness: 1,
                        },
                        CanvasOrientation: "Landscape",
                    },
                },
            },
        },

        Tags: [
            { Key: 'Department', Value: 'RND' }
        ]
    };
    console.info('Creating new chime media pipeline: ' + JSON.stringify(request));
    const command = new CreateMediaCapturePipelineCommand(request);
    const mediaPipeline = await chimeMediaPipeline.send(command);

    return response(200, 'application/json', JSON.stringify(mediaPipeline, null, 2));
}

const stopRecordMeeting = async (context) => {
    const MediaPipelineId = context.arguments.mediaPipelineId;

    if (!MediaPipelineId) {
        return response(400, 'application/json', JSON.stringify({
            error: 'Required properties: MediaPipelineId'
        }));
    }
    const request = {
        MediaPipelineId,
    };
    console.info('Delete media pipeline: ' + JSON.stringify(request));
    const command = new DeleteMediaCapturePipelineCommand(request);
    const deleteResponse = await chimeMediaPipeline.send(command);

    return response(200, 'application/json', JSON.stringify(deleteResponse, null, 2));
}

const generateRecordFile = async (context) => {
    const MediaPipelineArn = context.arguments.mediaPipelineArn;
    const folderName = context.arguments.folderName || "";
    const bucketArn = "arn:aws:s3:::meet-recordings-cecpi/public/recordings" + folderName;

    if (!MediaPipelineArn) {
        return response(400, 'application/json', JSON.stringify({
            error: 'Required properties: MediaPipelineArn'
        }));
    }
    const request = {
        Sources: [
            {
                Type: "MediaCapturePipeline",
                MediaCapturePipelineSourceConfiguration: {
                    MediaPipelineArn,
                    ChimeSdkMeetingConfiguration: { // ChimeSdkMeetingConcatenationConfiguration
                        ArtifactsConfiguration: { // ArtifactsConcatenationConfiguration
                            Audio: { // AudioConcatenationConfiguration
                                State: "Enabled", // required
                            },
                            Video: { // VideoConcatenationConfiguration
                                State: "Enabled", // required
                            },
                            Content: { // ContentConcatenationConfiguration
                                State: "Enabled", // required
                            },
                            DataChannel: { // DataChannelConcatenationConfiguration
                                State: "Enabled", // required
                            },
                            TranscriptionMessages: { // TranscriptionMessagesConcatenationConfiguration
                                State: "Disabled", // required
                            },
                            MeetingEvents: { // MeetingEventsConcatenationConfiguration
                                State: "Enabled", // required
                            },
                            CompositedVideo: { // CompositedVideoConcatenationConfiguration
                                State: "Enabled", // required
                            },
                        },
                    },
                },
            },
        ],
        Sinks: [
            {
                Type: "S3Bucket",
                S3BucketSinkConfiguration: {
                    Destination: bucketArn,
                }
            }
        ],
        ClientRequestToken: uuid(),

        Tags: [
            { Key: 'Department', Value: 'RND' }
        ]
    };
    console.info('Creating new chime media concatenation pipeline: ' + JSON.stringify(request));
    const command = new CreateMediaConcatenationPipelineCommand(request);
    const mediaConcatenationPipeline = await chimeMediaPipeline.send(command);

    return response(200, 'application/json', JSON.stringify(mediaConcatenationPipeline, null, 2));
}

const resolvers = {
    Query: {
        createChimeMeeting: context => {
            return createChimeMeeting(context);
        },
        joinChimeMeeting: context => {
            return joinChimeMeeting(context);
        },
        endChimeMeeting: context => {
            return endChimeMeeting(context);
        },
        createAppInstance: context => {
            return createAppInstance(context);
        },
        createAppInstanceUser: context => {
            return createAppInstanceUser(context);
        },
        createChannel: context => {
            return createChannel(context);
        },
        joinChannel: context => {
            return joinChannel(context);
        },
        sendMessage: context => {
            return sendMessage(context);
        },
        getMessagingEndpoint: context => {
            return getMessagingEndpoint(context);
        },
        recordMeeting: context => {
            return recordMeeting(context);
        },
        stopRecordMeeting: context => {
            return stopRecordMeeting(context);
        },
        generateRecordFile: context => {
            return generateRecordFile(context);
        },
    },
};

exports.handler = async (event) => {
    console.log(JSON.stringify(event));
    const typeHandler = resolvers[event.typeName];
    if (typeHandler) {
        const resolver = typeHandler[event.fieldName];
        if (resolver) {
            return await resolver(event);
        }
    }
    throw new Error('Resolver not found.');
};