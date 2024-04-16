import { useNavigate } from "react-router-dom";
import {
    Flex,
    Card,
    Heading,
    Button,
    useTheme
} from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';

const BannerSection = ({ heading, buttons }) => {
    const { tokens } = useTheme();
    const navigate = useNavigate();

    return (
        <Card as="section" backgroundColor={tokens.colors.background.secondary} margin="large">
            <Flex
                direction="column"
                gap="2rem"
                justifyContent="center"
                margin="large"
            >
                <Heading level={3} columnSpan={2}>{heading}</Heading>
                <Flex direction="row" justifyContent="space-evenly" wrap="wrap">
                    {
                        buttons.map(({ href, text }, i) => 
                            <Button key={i} width="15%" onClick={() => navigate(href)}>{text}</Button>
                        )
                    }
                </Flex>
            </Flex>
        </Card>
    )
}

BannerSection.propTypes = {
    heading: PropTypes.string.isRequired,
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            href: PropTypes.string,
            text: PropTypes.string.isRequired,
        })
    ).isRequired,
}

export default BannerSection;