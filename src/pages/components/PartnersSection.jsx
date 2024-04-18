import { useNavigate } from "react-router-dom";
import {
    Flex,
    Card,
    Heading,
    Image,
    Divider,
} from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';

const PartnersSection = ({ partners }) => {
    const navigate = useNavigate();

    return (
        <Card as="section">
        <Flex
            direction="row"
            gap="2rem"
            justifyContent="center"
            alignContent="stretch"
            alignItems="stretch"
        >
            <Heading level={2} marginBlock="auto">Partners</Heading>
            <Divider orientation="vertical" />
            <Card>
                <Flex
                    direction="row"
                    gap="1rem"
                >
                    {
                        partners.map(({ icon, href }, i) => 
                            <Image key={i} src={icon} width="100px" onClick={() => navigate(href)} />
                        )
                    }
                </Flex>
            </Card>
        </Flex>
    </Card>
    )
}

PartnersSection.propTypes = {
    partners: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string.isRequired,
            href: PropTypes.string,
        })
    ).isRequired,
}

export default PartnersSection;