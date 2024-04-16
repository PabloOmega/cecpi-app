import { useNavigate } from "react-router-dom";
import {
    Flex,
    Card,
    Heading,
    Text,
    Button,
    useTheme
} from '@aws-amplify/ui-react';
import { ParallaxProvider, ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import PropTypes from 'prop-types';

const ParallaxSection = ({ backgroundImg, title, text, button }) => {
    const { tokens } = useTheme();
    const navigate = useNavigate();

    return (
        <ParallaxProvider>
            <ParallaxBanner style={{ aspectRatio: '2 / 1', width: "100%", position: "relative"}}>
                <ParallaxBannerLayer image={backgroundImg} speed={-20} expanded={true} />
                <ParallaxBannerLayer speed={0} expanded={true} className="parallax-static">
                    <Flex
                        alignContent="center"
                        justifyContent="center"
                        alignItems="center"
                        width="40%"
                        marginInline="auto"
                    >
                        <Card backgroundColor={tokens.colors.background.primary} padding="large">
                            <Flex
                                direction="column"
                                alignContent="center"
                                justifyContent="center"
                                alignItems="center"
                                wrap="wrap"
                                gap="2rem"
                            >
                                <Heading level={2}>{title}</Heading>
                                <Text as="p" fontSize="1em" fontWeight="normal" textAlign="center">
                                    {text}
                                </Text>
                                <Button variation="primary" onClick={() => navigate(button.href)}>{button.text}</Button>
                            </Flex>
                        </Card>
                    </Flex>
                </ParallaxBannerLayer>
            </ParallaxBanner>
        </ParallaxProvider>
    )
}

ParallaxSection.propTypes = {
    backgroundImg: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    button: PropTypes.shape({
        href: PropTypes.string,
        text: PropTypes.string.isRequired,
    }).isRequired,
}

export default ParallaxSection;