import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

import { selectTeam, ProjectInterface } from '../features/team/teamSlice';

import Kanban from '../components/organisms/Kanban';
import TaskDetail from '../components/organisms/TaskDetail';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0px 50px;
`

const Header = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
`

const PageTitle = styled.span`
    color: ${({theme}) => theme.secondary};
    font-size: 32px;
    font-weight: bold;
`

const Project = () => {
    const { id, kanbanId, taskId } = useParams();
    const teamSelector = useAppSelector(selectTeam);
    const [project, setProject] = useState<ProjectInterface | undefined | null>(null);

    useEffect(() => {
        if (teamSelector.team) {
            const selectedProject = teamSelector.team.projects.find(project => project.id === id);

            setProject(selectedProject);
        }
    }, [id, teamSelector.team]);

    if (project === null) return <span>loading</span>

    if (project === undefined) return <Navigate to="/" />

    return (
        <Container>
            <Header>
                <PageTitle>{project.name}</PageTitle>
            </Header>
            {
                taskId ? <TaskDetail teamId={teamSelector.team!.id} project={project} kanbanId={kanbanId!} taskId={taskId!} /> : <Kanban project={project} />
            }
        </Container>
    );
};

export default Project;