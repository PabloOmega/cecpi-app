import { Flex, Card, Heading, Button } from '@aws-amplify/ui-react';


const NoPage = () => {
    return (
        <Flex className="flex-principal">
            <Card as="section" gap="1rem">
                <Heading level={2}>Lo sentimos. No hemos encontrado la página</Heading>
                <Button>Ir al inicio</Button>
            </Card>
        </Flex>
    )
}

export default NoPage;