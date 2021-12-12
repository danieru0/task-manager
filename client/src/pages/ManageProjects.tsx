import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { gql, useMutation } from "@apollo/client";

import { useAppDispatch, useAppSelector } from '../app/hooks';

import { setModal } from '../features/modal/modalSlice';
import { selectTeam, ProjectInterface } from '../features/team/teamSlice';

import ManageProjectsTable from '../components/molecules/ManageProjectsTable';
import ManageProjectsEditKanban from '../components/molecules/ManageProjectsEditKanban';
import Button from '../components/atoms/Button';

const deleteKanbanMutation = gql`
    mutation deleteKanban($teamId: String!, $projectId: String!, $kanbanId: String!) {
        deleteKanban(teamId: $teamId, projectId: $projectId, kanbanId: $kanbanId) {
            projectId
            kanbanId
        }
    }
`

const deleteProjectMutation = gql`
    mutation deleteProject($teamId: String!, $projectId: String!) {
        deleteProject(teamId: $teamId, projectId: $projectId)
    }
`

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
    const [ deleteKanban ] = useMutation(deleteKanbanMutation);
    const [ deleteProject ] = useMutation(deleteProjectMutation, {
        onError: err => {
            alert(err.message);
        }
    })

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

    const handleKanbanDeleteClick = (kanbanId: string, projectId: string) => {
        deleteKanban({
            variables: {
                teamId: teamSelector.team!.id,
                projectId,
                kanbanId
            }
        });
    }

    const handleProjectDeleteClick = (projectId: string) => {
        deleteProject({
            variables: {
                teamId: teamSelector.team!.id,
                projectId
            }
        })
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
                    <ManageProjectsEditKanban onKanbanDeleteClick={handleKanbanDeleteClick} onNewKanbanClick={handleNewKanbanClick} project={project} />
                ) : (
                    <ManageProjectsTable onProjectDeleteClick={handleProjectDeleteClick}  projects={teamSelector.team?.projects} />
                )
            }
        </Container>
    );
};

export default ManageProjects;