import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Flex,
    Card,
    Heading,
    Text,
    Message,
    withAuthenticator,
    Divider,
    Button,
    Collection,
    View,
    Icon,
    useTheme
} from '@aws-amplify/ui-react';
import { MdClose } from "react-icons/md";

const JoinClass = ({ isOpen, onClose, programId, meeting }) => {
    const [showLinkCopied, setShowLinkCopied] = useState(false);
    const { tokens } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        
    }, []);

    const copyLink = () => {
        setShowLinkCopied(true)
        navigator.clipboard.writeText(`localhost:5173/meeting/${programId}/${meeting.id}`);
    }

    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        isOpen && (
            <View
                as="div"
                position="fixed"
                height="100%"
                width="100%"
                top="0"
                left="0"
                backgroundColor={tokens.colors.overlay[10]}
                onClick={handleOutsideClick}
            >
                <Card
                    margin="medium"
                    backgroundColor={tokens.colors.background.secondary}
                    maxHeight="90%"
                    overflow="auto"
                    width="30%"
                    top="30%"
                    left="35%"
                    position="relative"
                >
                    <Flex direction="column" justifyContent="center" alignItems="center" wrap="wrap">
                        <Heading level={4}>{meeting.title}</Heading>
                        <Text>{meeting.description}</Text>
                        <Flex direction="row" justifyContent="center" alignItems="center" wrap="wrap">
                            <Button variation="primary" onClick={() => navigate(`/meeting/${programId}/${meeting.id}`)}>
                                Ir a la reunión
                            </Button>
                            <Button onClick={copyLink}>Copiar link</Button>
                        </Flex>
                        <Button onClick={onClose}>Cerrar ventana</Button>
                    </Flex>
                </Card>
                <Button onClick={onClose} position="absolute" top="30px" right="40px" size="large">
                    <Icon ariaLabel="Close" as={MdClose} />
                </Button>
                {showLinkCopied && (
                    <Message
                        margin="medium"
                        position="relative"
                        top="240px"
                        left="35%"
                        width="30%"
                        variation="filled"
                        colorTheme="info"
                        heading="Link copiado al portapeles"
                        hasIcon
                        isDismissible
                        onDismiss={() => setShowLinkCopied(false)}
                    />
                )}
            </View>
        )
    )
}

export default JoinClass;