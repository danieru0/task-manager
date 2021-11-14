import { useLocation } from 'react-router';
import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components';

import Logo from '../atoms/Logo';

import NavLink from '../molecules/NavLink';
import NavProjects from '../molecules/NavProjects';
import NavFooter from '../molecules/NavFooter';

const Container = styled.div`
    width: 280px;
    height: 100%;
    background: ${({theme}) => theme.primary};
    border-right: 2px solid ${({theme}) => theme.border};
    display: flex;
    flex-direction: column;
    padding-bottom: 40px;
`

const Menu = styled.ul`
    list-style: none;
`

const Nav = () => {
    const location = useLocation();
    const { isAuthenticated } = useAuth0();

    return (
        <Container>
            <Logo />
            <Menu>
                <NavLink active={location.pathname === '/'} to="/" icon="th-large" text="Overview" />
                { isAuthenticated && <NavProjects /> }
                { isAuthenticated && <NavLink active={location.pathname === '/messages'} to="/messages" icon="comment-dots" text="Messages" /> }
                { isAuthenticated && <NavLink active={location.pathname === '/settings'} to="/settings" icon="cog" text="Settings" /> }
            </Menu>
            { isAuthenticated && <NavFooter /> }
        </Container>
    );
};

export default Nav;