import {
    Label,
    RosterHeader,
    Flex as ChimeFlex,
} from 'amazon-chime-sdk-component-library-react';

const MeetingInformation = ({ isOpen, onClose, meeting}) => {

    return (
        isOpen && (
            <ChimeFlex
                direction="column"
                style={
                    {
                        position: "relative",
                        top: "-100%",
                        left: "0%",
                        width: "30%",
                        backgroundColor: "rgba(27, 28, 32)",
                        height: "100%"
                    }
                }
            >
                <RosterHeader
                    title={meeting.title}
                    onClose={() => onClose()}
                    a11yMenuLabel="Opciones de Roster"
                />
                <Label tag="p">{meeting.description}</Label>
            </ChimeFlex>
        )
    );
}

export default MeetingInformation;