import styled from 'styled-components';
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch } from '../../app/hooks';

import { clearUserData } from '../../features/user/userSlice';
import { clearTeamData } from '../../features/team/teamSlice';

import User from '../atoms/User';
import Icon from '../atoms/Icon';

const Container = styled.div`
    margin-top: auto;   
    width: 100%;
    padding-left: 30px;
    padding-right: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const StyledIconLogout = styled(Icon)`
    font-size: 20px;
    color: ${({theme}) => theme.navLink};
`
    
const LogoutButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    outline: none;

    &:hover ${StyledIconLogout} {
        color: ${({theme}) => theme.secondary};
    }
`


const NavFooter = () => {
    const dispatch = useAppDispatch();
    const { logout } = useAuth0();

    const handleLogoutButton = () => {
        dispatch(clearUserData);
        dispatch(clearTeamData);
        logout({ returnTo: window.location.origin })
    }

    return (
        <Container>
            <User />
            <LogoutButton onClick={handleLogoutButton}>
                <StyledIconLogout icon="sign-out-alt" />
            </LogoutButton>
        </Container>
    );
};

export default NavFooter;