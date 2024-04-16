import { Outlet } from "react-router-dom";
import { useState } from 'react';
import {
    Flex,
    Card,
    Authenticator,
    Button,
    useAuthenticator
} from '@aws-amplify/ui-react';
import { signOut } from '@aws-amplify/auth';
import NavigationBar from "./components/NavigationBar";

const Layout = () => {

    const { authStatus } = useAuthenticator(context => [context.authStatus]);

    const [showAuth, setShowAuth] = useState(false);

    const handleSignInClick = () => {
        setShowAuth(true);
    };
    async function handleSignOut() {
        try {
            await signOut();
            setShowAuth(false);
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        <Flex
            position="relative"
            direction="column"
            alignItems="stretch"
            alignContent="stretch"
            justifyContent="space-around"
            gap="0"
            wrap="wrap"
        >
            <Card>
                <Flex
                    position="relative"
                    direction="row"
                    alignItems="stretch"
                    justifyContent="space-around"
                    gap="5"
                >
                    <NavigationBar />
                    {
                        showAuth && (
                            <Authenticator variation="modal" />
                        )
                    }
                    <Button onClick={authStatus === 'authenticated' ? handleSignOut : handleSignInClick}>
                        {authStatus === 'authenticated' ? "Cerrar Sesión" : "Ingresar"}
                    </Button>
                </Flex>
            </Card>

            <Card>
                <Outlet />
            </Card>

            <Card>
                Footer
            </Card>
        </Flex>
    )
};

export default Layout