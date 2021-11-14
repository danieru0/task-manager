import styled from 'styled-components';

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
    return (
        <Container>
            <User />
            <LogoutButton>
                <StyledIconLogout icon="sign-out-alt" />
            </LogoutButton>
        </Container>
    );
};

export default NavFooter;