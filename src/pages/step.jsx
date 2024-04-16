import { useEffect, useState, useRef } from 'react';
import {
    Flex,
    Card,
    Heading,
    Text,
    Image,
    withAuthenticator,
    Divider,
    Button,
    Collection,
    View,
    Icon,
    useTheme
} from '@aws-amplify/ui-react';
import ReactPlayer from 'react-player'
import { getUrl, getProperties } from 'aws-amplify/storage';
import { MdClose, MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const Step = ({ isOpen, onClose, stepInfo, progress, seeked, onPreviousNext, hasPrevious = true, hasNext = true }) => {
    const [video, setVideo] = useState();
    const playerRef = useRef(null);
    const { tokens } = useTheme();

    useEffect(() => {
        getVideo();
    }, [stepInfo, progress]);

    async function getVideo() {
        if (!stepInfo) return;
        const getUrlResult = await getUrl({
            key: stepInfo.Video.path,
            options: {
                accessLevel: 'guest', // can be 'private', 'protected', or 'guest' but defaults to `guest`
                expiresIn: 3600,  // defaults to false
            },
        });

        setVideo(getUrlResult.url);
    }

    const handleOnReady = () => {
        if (!seeked) {
            playerRef.current.seekTo(progress.progress, "fraction");
            seeked = true;
        }
    }

    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            const fractionPlayed = playerRef.current.getCurrentTime() / playerRef.current.getDuration();
            onClose(progress.id, fractionPlayed);
        }
    };

    const handleOnClose = () => {
        const fractionPlayed = playerRef.current.getCurrentTime() / playerRef.current.getDuration();
        onClose(progress.id, fractionPlayed);
    }

    const handlePrevious = () => {
        const fractionPlayed = playerRef.current.getCurrentTime() / playerRef.current.getDuration();
        onPreviousNext(progress.id, fractionPlayed);
    }

    const handleNext = () => {
        const fractionPlayed = playerRef.current.getCurrentTime() / playerRef.current.getDuration();
        onPreviousNext(progress.id, fractionPlayed, false);
    }

    return (
        isOpen && (
            <View
                as="div"
                position="fixed"
                width="100%"
                height="100%"
                top="0"
                left="0"
                backgroundColor={tokens.colors.overlay[5]}
                onClick={handleOutsideClick}
            >
                <Card margin="medium" backgroundColor={tokens.colors.background.secondary} maxHeight="90%" overflow="auto">
                    <Flex direction="column" justifyContent="center" alignItems="center">
                        <Heading level={4}>{stepInfo.title}</Heading>
                        <Text>{stepInfo.description}</Text>
                        <ReactPlayer
                            ref={playerRef}
                            controls
                            url={video ? video.href : ""}
                            onReady={handleOnReady}
                            config={{
                                file: {
                                    attributes: {
                                        onContextMenu: e => e.preventDefault(),
                                        controlsList: 'nodownload'
                                    }
                                }
                            }}
                        />
                        <Button onClick={handleOnClose}>Cerrar ventana</Button>
                    </Flex>
                </Card>
                <Button onClick={handleOnClose} position="absolute" top="30px" right="30px" size="large">
                    <Icon ariaLabel="Close" as={MdClose} />
                </Button>
                {
                    hasPrevious && (
                        <Button onClick={handlePrevious} position="absolute" top="50%" left="30px" size="large">
                            <Icon ariaLabel="Close" as={MdArrowBackIos} />
                        </Button>
                    )
                }
                {
                    hasNext && (
                        <Button onClick={handleNext} position="absolute" top="50%" right="30px" size="large">
                            <Icon ariaLabel="Close" as={MdArrowForwardIos} />
                        </Button>
                    )
                }
            </View>
        )
    )
}

export default Step;