import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';

import { useAppDispatch, useAppSelector } from '../app/hooks';

import { setModal } from '../features/modal/modalSlice';
import { selectTeam, ProjectInterface } from '../features/team/teamSlice';

import ManageProjectsTable from '../components/molecules/ManageProjectsTable';
import ManageProjectsEditKanban from '../components/molecules/ManageProjectsEditKanban';
import Button from '../components/atoms/Button';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    padding: 0px 50px;
`

const Header = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const PageTitle = styled.span`
    color: ${({theme}) => theme.secondary};
    font-size: 28px;
    font-weight: bold;
`

const ManageProjects = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const teamSelector = useAppSelector(selectTeam);
    const [project, setProject] = useState<ProjectInterface | undefined>(undefined)

    const handleNewProjectClick = () => {
        dispatch(setModal({
            modalName: 'new-project'
        }));
    }

    const handleNewKanbanClick = (projectId: string) => {
        dispatch(setModal({
            modalName: 'new-kanban',
            variables: {
                projectId
            }
        }))
    }

    useEffect(() => {
        if (teamSelector.team) {
            const selectedProject = teamSelector.team.projects.find(project => project.id === id);

            setProject(selectedProject);
        }
    }, [id, teamSelector.team]);

    return (
        <Container>
            <Header>
                <PageTitle>Manage Projects</PageTitle>
                <Button onClick={handleNewProjectClick} text="new project" />
            </Header>
            {
                id && project ? (
                    <ManageProjectsEditKanban onNewKanbanClick={handleNewKanbanClick} project={project} />
                ) : (
                    <ManageProjectsTable projects={teamSelector.team?.projects} />
                )
            }
        </Container>
    );
};

export default ManageProjects;