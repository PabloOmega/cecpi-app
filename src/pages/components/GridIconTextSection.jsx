
import {
    Card,
    Heading,
    Text,
    Image,
    Grid,
} from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';

const GridIconTextSection = ({ components }) => {
    return (
        <Grid
            gap="1rem"
            templateColumns="40% 40%"
            templateRows="1fr 1fr"
            justifyContent="center"
        >
            {components.map(({ icon, title, text }, i) => {
                return (
                    <Card key={i}>
                        <Grid
                            gap="1rem"
                            templateColumns="1fr 3fr"
                            templateRows="1fr 3fr"
                        >
                            <Card rowSpan={2} >
                                <Image src={icon} />
                            </Card>
                            <Heading level={3}>{title}</Heading>
                            <Text textAlign="start">{text}</Text>
                        </Grid>
                    </Card>
                )
            })}
        </Grid>
    )
}

GridIconTextSection.propTypes = {
    components: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default GridIconTextSection;
