import { useState } from 'react';

import {
    Flex,
    FormField,
    Input,
    PrimaryButton,
    useMeetingManager,
} from 'amazon-chime-sdk-component-library-react';
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';
import { addAttendeeToDB, addMeetingToDB, createMeetingLambda, getAttendeeFromDB, getMeetingFromDB, joinMeetingLambda } from '../utils/api';

const MeetingForm = () => {
    const meetingManager = useMeetingManager();
    const [meetingTitle, setMeetingTitle] = useState('');
    const [attendeeName, setName] = useState('');

    function getAttendeeCallback() {
        return async (chimeAttendeeId, externalUserId) => {
            const attendeeInfo = await getAttendeeFromDB(chimeAttendeeId);
            const attendeeData = attendeeInfo.data.getAttendee;
            return {
                name: attendeeData.name
            };
        }
    }

    const clickedJoinMeeting = async (event) => {
        event.preventDefault();

        meetingManager.getAttendee = getAttendeeCallback();
        const title = meetingTitle.trim().toLocaleLowerCase();
        const name = attendeeName.trim();

        // Fetch the Meeting via AWS AppSync - if it exists, then the meeting has already
        // been created, and you just need to join it - you don't need to create a new meeting
        const meetingResponse = await getMeetingFromDB(title);
        const meetingJson = meetingResponse.data.getMeeting;
/*        try {*/
            if (meetingJson) {
                const meetingData = JSON.parse(meetingJson.data);
                const joinInfo = await joinMeetingLambda(meetingData.MeetingId, name);
                await addAttendeeToDB(joinInfo.Attendee.AttendeeId, name);
                console.log(joinInfo);

                const meetingSessionConfiguration = new MeetingSessionConfiguration(meetingData, joinInfo.Attendee);

                //await meetingManager.join({
                //    meetingInfo: meetingData,
                //    attendeeInfo: joinInfo.Attendee
                //});
                await meetingManager.join(meetingSessionConfiguration);
            } else {
                const joinInfo = await createMeetingLambda(title, name, 'us-east-1');
                await addMeetingToDB(title, joinInfo.Meeting.MeetingId, JSON.stringify(joinInfo.Meeting)); await addAttendeeToDB(joinInfo.Attendee.AttendeeId, name);
                console.log(joinInfo);

                const meetingSessionConfiguration = new MeetingSessionConfiguration(joinInfo.Meeting, joinInfo.Attendee);

                //await meetingManager.join({
                //    meetingInfo: joinInfo.Meeting,
                //    attendeeInfo: joinInfo.Attendee
                //});
                await meetingManager.join(meetingSessionConfiguration);
            }
        //} catch (error) {
        //    console.log(error);
        //}

        // At this point you can let users setup their devices, or start the session immediately
        await meetingManager.start();
    };

    return (
        <form>
            <FormField
                field={Input}
                label='Meeting Id'
                value={meetingTitle}
                fieldProps={{
                    name: 'Meeting Id',
                    placeholder: 'Enter a Meeting ID',
                }}
                onChange={(e) => {
                    setMeetingTitle(e.target.value);
                }}
            />
            <FormField
                field={Input}
                label="Name"
                value={attendeeName}
                fieldProps={{
                    name: 'Name',
                    placeholder: 'Enter your Attendee Name'
                }}
                onChange={(e) => {
                    setName(e.target.value);
                }}
            />
            <Flex
                container
                layout="fill-space-centered"
                style={{ marginTop: '2.5rem' }}
            >
                <PrimaryButton label="Join Meeting" onClick={clickedJoinMeeting} />
            </Flex>
        </form>
    );
};

export default MeetingForm;