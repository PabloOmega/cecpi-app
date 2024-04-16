import { useEffect, useState, useRef } from 'react';
import {
    RosterHeader,
    PopOverItem,
    PopOverSubMenu,
    Flex as ChimeFlex,
    ChatBubble,
    Textarea,
    IconButton,
    Arrow,
} from 'amazon-chime-sdk-component-library-react';
import {
    subscribeMessagesDB,
    sendMessageDB,
} from '../utils/api';

const MeetingChat = ({ isOpen, onClose, meeting, attendee, prevMessages, onMessageReceived }) => {
    const [messages, setMessages] = useState(prevMessages);
    const inputRef = useRef(null);

    useEffect(() => {
        if (meeting && attendee) {
            const subscription = startSession();
            //return async () => (await subscription) ? subscription.unsubscribe() : null;
        }
    }, [meeting, attendee]);

    async function startSession() {
        return await subscribeMessagesDB(meeting.id,
            onMessageReceivedEvent,
            (error) => console.warn(error)
        );
    }

    function onMessageReceivedEvent(data) {
        const newMessage = data.onCreateMessage;
        if (onMessageReceived) onMessageReceived(newMessage);
        if (newMessage.type != "MESSAGE") return;
        setMessages(prevMessages => {
            if (prevMessages.find((message) => message.id === newMessage.id)) return prevMessages;
            return [...prevMessages, newMessage];
        });
    }

    const sendMessage = async () => {
        await sendMessageDB(inputRef.current.value, attendee.name, attendee.attendeeId, meeting.id);
    }

    function formatTime(time) {
        const date = new Date(time);
        const timeFormatted = `${date.getHours()}:` + (date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`);
        return (
            <span style={{ marginInline: "auto" }}>{timeFormatted}</span>
        )
    }

    const handleOnSend = () => {
        if (inputRef.current.value === '') return;
        sendMessage();
        inputRef.current.value = '';
    }

    const handleOnSendEnter = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleOnSend();
        }
    }

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
                    title="Mensajes"
                    badge={messages.length}
                    onClose={() => onClose(messages)}
                    a11yMenuLabel="Opciones de Roster"
                    menu={
                        (
                            <>
                                <PopOverItem
                                    as="button"
                                    onClick={() => { }}
                                >
                                    Silenciar a todos
                                </PopOverItem>
                                <PopOverItem
                                    as="button"
                                    onClick={() => { }}
                                >
                                    Apagar todas las cámaras
                                </PopOverItem>
                            </>
                        )
                    }
                />
                <div
                    style={{
                        padding: '0.5rem',
                        borderBottom: "solid 1px black",
                        overflowY: "auto",
                        overflowX: "hidden",
                        height: "75%",
                        maxHeight: "75%"
                    }}
                >
                    {
                        messages.map((message, index) => {
                            return (
                                <ChimeFlex key={index} layout='stack' >
                                    <ChatBubble
                                        timestamp={formatTime(message.createdAt)}
                                        variant={message.attendeeID === attendee.attendeeId ? "outgoing" : "incoming"}
                                        senderName={message.senderName}
                                        showTail={true}
                                        css="margin-block: 10px"
                                    >
                                        {message.content}
                                    </ChatBubble>                               
                                </ChimeFlex>
                            );
                        })
                    }
                </div>
                <div>
                    <ChimeFlex layout="fill-space-centered">
                        <Textarea
                            placeholder="Escríbe tu mensaje"
                            onKeyDown={handleOnSendEnter}
                            ref={inputRef}
                            rows="2"
                            style={{ width: "70%", marginRight: "2rem", marginBlock: "1rem", resize: "none" }}
                        />
                        <IconButton
                            icon={<Arrow />}
                            label="Enviar"
                            variant="icon"
                            onClick={handleOnSend}
                        />
                    </ChimeFlex>
                </div>
            </ChimeFlex>
        )
    );
}

export default MeetingChat;