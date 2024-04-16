import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Flex,
    Card,
    Heading,
    Text,
    SelectField,
    withAuthenticator,
    Divider,
    Button,
    Collection,
    View,
    Icon,
    useTheme
} from '@aws-amplify/ui-react';
import { MdClose } from "react-icons/md";
import {
    MeetingCreateForm
} from '../ui-components';

const NewClass = ({ isOpen, onClose }) => {
    const [activityType, setActivityType] = useState("meeting");
    const { tokens } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        
    }, []);

    const getForm = () => {
        switch (activityType) {
            case "meeting":
                return (
                    <MeetingCreateForm
                        onSubmit={handleMeetingOnSubmit}
                        onSuccess={handleMeetingOnSuccess}
                        onError={(modelFields, messages) => console.log(modelFields, messages)}
                    />
                );
        }
    }

    const handleMeetingOnSubmit = (fields) => {
        //fields.data = "datos";
        return fields;
    }

    const handleMeetingOnSuccess = (fields) => {
        onClose();
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
                width="100%"
                height="100%"
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
                    width="40%"
                    left="30%"
                    position="relative"
                >
                    <Flex direction="column" justifyContent="center" alignItems="center">
                        <Heading level={4}>Crear una nueva actividad</Heading>
                        <SelectField
                            label="Tipo de actividad"
                            placeholder="Seleccione el tipo de actividad"
                            errorMessage="Un error ha ocurrido"
                            defaultValue="meeting"
                            onChange={(e) => setActivityType(e.target.value)}
                        >
                            <option value="meeting">Clase</option>
                        </SelectField>
                        {getForm()}
                        <Button onClick={onClose}>Cerrar ventana</Button>
                    </Flex>
                </Card>
                <Button onClick={onClose} position="absolute" top="30px" right="40px" size="large">
                    <Icon ariaLabel="Close" as={MdClose} />
                </Button>
            </View>
        )
    )
}

export default NewClass;