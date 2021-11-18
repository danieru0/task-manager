import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import Icon from './Icon';

interface IProjectLink {
    to: string;
    text: string;
    active: boolean;
}

interface ProjectProps {
    active: string;
}

const Container = styled.li`
    width: 100%;
    height: 50px;
`

const Project = styled(Link)<ProjectProps>`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    color: ${({theme}) => theme.navLink};
    text-decoration: none;
    font-size: 16px;
    padding-left: 20px;

    &:hover {
        background: ${({theme}) => theme.secondary};
        color: ${({theme}) => theme.primary};
    }

    ${({theme, active}) => active === 'true' && css`
        background: ${theme.secondary};
        color: ${theme.primary};  
    `}
`

const StyledIcon = styled(Icon)`
    margin-left: 14px;
`

const Text = styled.span`
    margin-left: 15px;
`

const ProjectLink = ({ to, text, active }: IProjectLink) => {
    return (
        <Container>
            <Project active={active.toString()} to={to}>
                <StyledIcon icon="file-code" />
                <Text>{text}</Text>
            </Project>
        </Container>
    );
};

export default ProjectLink;