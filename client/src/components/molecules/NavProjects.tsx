import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { ProjectInterface } from '../../features/team/teamSlice';

import ProjectLink from '../atoms/ProjectLink';
import Icon from '../atoms/Icon';

interface INavProjects {
    projects: ProjectInterface[];
    active: Boolean;
    clickedProjectId: string | undefined;
}

interface ProjectsButtonProps {
    projectsclicked: string | undefined;
}

interface ProjectsArrowIconProps extends ProjectsButtonProps {}

interface ProjectWrapperProps extends ProjectsButtonProps {
    projectsHeight: number;
}

const Container = styled.li`
    width: 100%;
    min-height: 50px;
`

const ProjectsButton = styled.button<ProjectsButtonProps>`
    width: 100%;
    height: 50px;
    border: none;
    cursor: pointer;
    outline: none;
    padding-left: 30px;
    padding-right: 30px;
    color: ${({projectsclicked, theme}) => projectsclicked ? theme.secondary : theme.navLink};
    font-size: 18px;
    display: flex;
    align-items: center;
    position: relative;
    transition: background .3s, color .3s;
    background: ${({projectsclicked, theme}) => projectsclicked ? theme.navActiveBg : 'none'};

    &:hover {
        background: ${({theme}) => theme.navActiveBg};
    }

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

    ${({projectsclicked}) => projectsclicked && css`
        &:before {
            transform: translatex(0px);
        }
    `}

`

const StyledMainIcon = styled(Icon)`
    font-size: 22px;
`

const Text = styled.span`
    margin-left: 20px;
`

const StyledArrowIcon = styled(Icon)<ProjectsArrowIconProps>`
    font-size: 22px;
    margin-left: auto;
    transition: transform .3s;

    ${({projectsclicked}) => projectsclicked && css`
        transform: rotate(90deg);
    `}
`

const ProjectsMenu = styled.ul<ProjectWrapperProps>`
    list-style: none;
    max-height: 0;
    overflow: hidden;
    transition: max-height .3s;
    display: flex;
    background: ${({theme}) => theme.navActiveBg};

    ${({projectsclicked, projectsHeight}) => projectsclicked && css`
        max-height: ${projectsHeight}px
    `}
`

const ProjectsLine = styled.div`
    width: 45px;
    height: 140px;
    display: block;
    border-right: 2px solid #E7E7E7;
`

const ProjectsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

const NavProjects = ({ projects, active, clickedProjectId }: INavProjects) => {
    const [ projectsClicked, setProjectsClicked ] = useState(false);
    const [ projectsHeight, setProjectsHeight ] = useState(0);

    const handleProjectsBtnClick = () => {
        setProjectsClicked(prev => !prev);
    }

    useEffect(() => {
        if (projects) {
            setProjectsHeight(projects.length * 50);
        }
    }, [projects]);

    useEffect(() => {
        if (!active) {
            setProjectsClicked(false);
        }
    }, [active]);

    return (
        <Container>
            <ProjectsButton projectsclicked={projectsClicked || active ? 'true' : undefined} onClick={handleProjectsBtnClick}>
                <StyledMainIcon icon="project-diagram" />
                <Text>Projects</Text>
                <StyledArrowIcon projectsclicked={projectsClicked || active ? 'true' : undefined} icon="caret-right" />
            </ProjectsButton>
            <ProjectsMenu projectsHeight={projectsHeight} projectsclicked={projectsClicked || active ? 'true' : undefined}>
                <ProjectsLine />
                <ProjectsWrapper>
                    {
                        projects.map(project => {
                            return <ProjectLink key={project.id} active={clickedProjectId === project.id} to={`/project/${project.id}`} text={project.name} />
                        })
                    }
                </ProjectsWrapper>
            </ProjectsMenu>
        </Container>
    );
};

export default NavProjects;