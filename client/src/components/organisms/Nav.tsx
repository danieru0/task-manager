import { useLocation } from 'react-router';
import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';

import { selectTeam } from "../../features/team/teamSlice";

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
    position: fixed;
`

const Menu = styled.ul`
    list-style: none;
`

const Nav = () => {
    const location = useLocation();
    const { isAuthenticated } = useAuth0();
    const teamSelector = useAppSelector(selectTeam);

    return (
        <Container>
            <Logo />
            <Menu>
                <NavLink active={location.pathname === '/'} to="/" icon="th-large" text="Overview" />
                { isAuthenticated && teamSelector.team && <NavProjects active={location.pathname.split('/')[1] === 'project'} clickedProjectId={location.pathname.split('/')[2]} projects={teamSelector.team.projects} /> }
                { isAuthenticated && teamSelector.team && <NavLink active={location.pathname === '/messages'} to="/messages" icon="comment-dots" text="Messages" /> }
                { isAuthenticated && <NavLink active={location.pathname === '/settings'} to="/settings" icon="cog" text="Settings" /> }
            </Menu>
            { isAuthenticated && <NavFooter /> }
        </Container>
    );
};

export default Nav;