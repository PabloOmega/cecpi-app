
import { useNavigate } from 'react-router-dom';
import {
    Flex,
    Card,
    Heading,
    Text,
    Image,
    Button,
    useTheme
} from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';

const ProgramCard = ({program}) => {
    const { tokens } = useTheme();
    const navigate = useNavigate();

    return (
        <Card
            borderRadius="medium"
            maxWidth="20rem"
            gap="2rem"
            padding="large"
            backgroundColor={tokens.colors.background.secondary}
        >
            <Flex direction="column" alignContent="center" alignItems="center">
                <Heading level={3}>{program.name}</Heading>
                <Image src={program.image} alt={program.name} borderRadius="medium" />
                {
                    program.discount ? (
                        <Flex direction="column">
                            <Heading level={3} textDecoration="line-through" color="red">{"$ " + program.price}</Heading>
                            <Heading level={3}>{"$ " + (program.price - program.discount).toFixed(2)}</Heading>
                        </Flex>
                    ) : (
                        <Heading level={3}>{program.price}</Heading>
                    )
                }
                <Text>{program.shortDescription}</Text>
                <Button variation="primary" onClick={() => navigate(`/inscripcion/${program.id}`)}>
                    Inscribirme
                </Button>
                <Button>Contenido</Button>
            </Flex>
        </Card>
    );
}

ProgramCard.propTypes = {
    program: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        discount: PropTypes.number.isRequired,
        shortDescription: PropTypes.string.isRequired,
    }).isRequired,
}


export default ProgramCard;