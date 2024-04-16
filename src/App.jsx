
import { Component } from 'react';
import './App.css'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Ia from './pages/ia'
import Type from './pages/type'
import Inscripcion from './pages/inscripcion'
import NoPage from "./pages/nopage";
import MisCursos from "./pages/mis-cursos";
import Program from "./pages/program";
import Actividades from "./pages/actividades";
import Calendario from "./pages/calendario";
import Meeting from "./pages/meeting";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    Flex,
    defaultDarkModeOverride,
    ThemeProvider,
    Authenticator
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { DataStore, AuthModeStrategyType } from 'aws-amplify/datastore';

import {
    MeetingProvider
} from 'amazon-chime-sdk-component-library-react';

DataStore.configure({
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
});

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const theme = {
            name: 'default-theme',
            overrides: [defaultDarkModeOverride],
        };

        return (
            <Authenticator.Provider>
                <ThemeProvider theme={theme} colorMode="dark">
                    <MeetingProvider>
                        <Flex
                            position="absolute"
                            top="0"
                            left="0"
                            width="100%"
                            height="100%"
                            direction="column"
                            alignItems="stretch"
                            alignContent="space-between"
                            justifyContent="stretch"
                            gap="0rem"
                        >
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" element={<Layout />}>
                                        <Route index element={<Home />} />
                                        <Route path="/ia" element={<Ia />} />
                                        <Route path="/cursos/:type" element={<Type />} />
                                        <Route path="/inscripcion/:programId" element={<Inscripcion />} />
                                        <Route path="/mis-cursos/:studentId" element={<MisCursos />} />
                                        <Route path="/curso/:studentId/:programId" element={<Program />} />
                                        <Route path="/actividades/:studentId/:programId" element={<Actividades />} />
                                        <Route path="/calendario/:studentId/:programId" element={<Calendario />} />
                                        <Route path="/meeting/:programId/:meetingId" element={<Meeting />} />
                                        <Route path="*" element={<NoPage />} />
                                    </Route>
                                </Routes>
                            </BrowserRouter>
                        </Flex>
                    </MeetingProvider>
                </ThemeProvider>            
            </Authenticator.Provider>
        );
    }
}

export default App
