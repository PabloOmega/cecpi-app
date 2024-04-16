import {
    Flex,
    Card,
    Heading,
    Text,
    Image,
    Divider,
    Button,
} from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';

const ImageButtonTextSection = ({ title, text, img, imgAlt, firstText = true }) => {
    const textCard = (
        <Card width="45%" padding="medium">
            <Flex
                direction="column"
                justifyContent="stretch"
                alignItems="stretch"
                alignContent="stretch"
                wrap="wrap"
            >
                <Heading level="1" textAlign="start" margin="medium">
                    {title}
                </Heading>
                <Divider orientation="horizontal" width="60%" />
                <Text as="p" fontSize="1em" fontWeight="normal" textAlign="start" margin="medium">
                    {text}
                </Text>
            </Flex>
        </Card>
    );
    const imgCard = (
        <Card width="45%" padding="small">
            <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
                alignContent="stretch"
                wrap="wrap"
            >
                <Image alt={imgAlt} src={img} objectFit="cover" height="280px" width="80%" />
                <Button variation="primary" margin="small">Ver cursos</Button>
            </Flex>
        </Card>
    );
    return (
        <Card as="section">
            <Flex className="flex-seccion">
                {firstText ? textCard : imgCard}
                {firstText ? imgCard : textCard}
            </Flex>
        </Card>
    )
}

ImageButtonTextSection.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
    firstText: PropTypes.bool,
}

export default ImageButtonTextSection;