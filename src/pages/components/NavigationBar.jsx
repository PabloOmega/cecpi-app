import { useLocation, useNavigate } from "react-router-dom";
import {
    Breadcrumbs,
    Menu,
    MenuItem,
    MenuButton,
} from '@aws-amplify/ui-react';

const pages = [
    {
        title: "Inicio",
        path: "/",
        submenu: null
    },
    {
        title: "Asesoría IA",
        path: "/ia",
        submenu: [
            {
                title: "Soluciones IA",
                path: "/ia"
            },
            {
                title: "Wix Experts",
                path: "/wix"
            },
            {
                title: "Chat GPT Assistant",
                path: "/chat-gpt"
            },
        ]
    },
    {
        title: "Cursos",
        path: "/cursos",
        submenu: [
            {
                title: "IA y Python",
                path: "/cursos/ia"
            },
            {
                title: "Unity",
                path: "/cursos/unity"
            },
        ]
    },
    {
        title: "Mis Cursos",
        path: "/mis-cursos/0",
        submenu: null
    },
]

const NavigationBar = () => {

    const location = useLocation();
    const navigate = useNavigate();

    function isCurrentPath(path) {
        return location.pathname.split("/")[1] === path.split("/")[1];
    }

    return (
        <Breadcrumbs.Container position="relative">
            {pages.map(({ title, path, submenu }) => {
                return (
                    <Breadcrumbs.Item key={path}>
                        {
                            !submenu ?
                                <Breadcrumbs.Link href={path} isCurrent={isCurrentPath(path)}>
                                    {title}
                                </Breadcrumbs.Link> :
                                <Menu
                                    boxShadow="none"
                                    borderWidth="0"
                                    fontSize="1rem"
                                    fontStyle="normal"
                                    fontWeight="normal"
                                    trigger={
                                        <MenuButton
                                            borderWidth="0"
                                            fontSize="1rem"
                                            lineHeight="small"
                                            fontWeight="normal"
                                            color={
                                                isCurrentPath(path) ?
                                                    "var(--amplify-components-breadcrumbs-link-current-color)" :
                                                    "var(--amplify-components-breadcrumbs-link-color)"
                                            }
                                        >
                                            {title}
                                        </MenuButton>
                                    }
                                >
                                    {submenu.map(({ title, path }) => {
                                        return (
                                            <MenuItem key={title} onClick={() => navigate(path)}>
                                                {title}
                                            </MenuItem>
                                        );
                                    })}
                                </Menu>
                        }
                    </Breadcrumbs.Item>
                );
            })}
        </Breadcrumbs.Container>
    )
};

export default NavigationBar;