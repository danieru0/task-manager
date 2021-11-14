import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import Icon, { IconTypes } from '../atoms/Icon';

interface INavLink {
    icon: IconTypes
    to: string;
    text: string;
    active: boolean;
}

interface IContainer {
    active: string
}

const Container = styled(Link)<IContainer>`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    color: ${({active, theme}) => active ? theme.secondary : theme.navLink};
    font-size: 18px;
    text-decoration: none;
    padding-left: 30px;
    transition: background .3s;

    &:hover {
        background: ${({theme}) => theme.navActiveBg};
    }

    ${({active}) => active && css`
        background: ${({theme}) => theme.navActiveBg};
    `}
`

const StyledIcon = styled(Icon)`
    font-size: 26px;
`

const Text = styled.span`
    margin-left: 20px;
`

const NavLink = ({ icon, to, text, active }: INavLink) => {
    return (
        <Container active={active ? 'true' : ''} to={to}>
            <StyledIcon icon={icon} />
            <Text>{text}</Text>
        </Container>
    );
};

export default NavLink;