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
    position: relative;

    &:before {
        content: "";
        display: block;
        width: 5px;
        height: 30px;
        background: ${({theme}) => theme.secondary};
        left: 0px;
        top: 0;
        bottom: 0;
        margin: auto;
        position: absolute;
        transform: translateX(-30px);
        transition: transform .3s;
    }

    &:hover {
        background: ${({theme}) => theme.navActiveBg};
    }

    ${({active}) => active && css`
        background: ${({theme}) => theme.navActiveBg};
        &:before {
            transform: translatex(0px);
        }
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