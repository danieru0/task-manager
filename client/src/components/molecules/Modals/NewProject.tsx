import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { gql, useMutation } from "@apollo/client";

import { ProjectInterface } from '../../../features/team/teamSlice';

import CloseModalButton from './CloseModalButton';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';

interface INewProject {
    teamId: string | undefined;
    onSuccessProjectAdd: (projectData: ProjectInterface) => void;
    onCloseClick: () => void;
}

const createProjectMutation = gql`
    mutation createProject($name: String!, $teamId: String!) {
        createProject(name: $name, teamId: $teamId) {
            id
            name
            tasksCounter
            kanbans {
                id
            }
        }
    }
`

const Container = styled.div`
    width: 500px;
    height: 250px;
    background: ${({theme}) => theme.primary};
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const StyledButton = styled(Button)`
    margin-top: 20px;
`

const NewProject = ({ teamId, onCloseClick, onSuccessProjectAdd }: INewProject) => {
    const [ projectName, setProjectName ] = useState('');
    const [ createProject, { data, loading } ] = useMutation(createProjectMutation);

    useEffect(() => {
        if (data) {
            onSuccessProjectAdd(data.createProject);
        }
    }, [data]); //eslint-disable-line

    const handleProjectNameSubmit = () => {
        if (projectName.trim().length > 0 && !loading) {
            createProject({
                variables: {
                    name: projectName,
                    teamId
                }
            });
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectName(e.target.value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleProjectNameSubmit();
        }
    }

    const handleButtonClick = () => {
        handleProjectNameSubmit();
    }

    return (
        <Container>
            <CloseModalButton icon="times" onClick={onCloseClick} />
            <Input value={projectName} placeholder="Project name" onKeyDown={handleKeyDown} onChange={handleInputChange} />
            <StyledButton loading={loading} size="small" text="create" onClick={handleButtonClick} />
        </Container>
    );
};

export default NewProject;