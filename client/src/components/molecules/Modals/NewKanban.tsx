import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { gql, useMutation } from "@apollo/client";

import { KanbanInterface } from '../../../features/team/teamSlice';

import CloseModalButton from './CloseModalButton';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';

interface INewProject {
    teamId: string | undefined;
    projectId: string | undefined;
    onSuccessKanbanAdd: (kanbandata: KanbanInterface, id: string | undefined) => void;
    onCloseClick: () => void;
}

const createKanbanMutation = gql`
    mutation createKanban($name: String!, $teamId: String!, $projectId: String!) {
        createKanban(name: $name, teamId: $teamId, projectId: $projectId) {
            id
            name
            tasks {
                name
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

const NewKanban = ({ teamId, projectId, onCloseClick, onSuccessKanbanAdd }: INewProject) => {
    const [ kanbanName, setKanbanName ] = useState('');
    const [ createKanban, { data, loading } ] = useMutation(createKanbanMutation);

    useEffect(() => {
        if (data) {
            onSuccessKanbanAdd(data.createKanban, projectId);
        }
    }, [data]) //eslint-disable-line

    const handleNewKanbanSubmit = () => {
        if (kanbanName.trim().length > 0 && !loading) {
            createKanban({
                variables: {
                    name: kanbanName,
                    teamId,
                    projectId
                }
            })
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKanbanName(e.target.value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleNewKanbanSubmit();
        }
    }

    const handleButtonClick = () => {
        handleNewKanbanSubmit();
    }

    return (
        <Container>
            <CloseModalButton icon="times" onClick={onCloseClick} />
            <Input value={kanbanName} placeholder="Kanban name" onKeyDown={handleKeyDown} onChange={handleInputChange} />
            <StyledButton loading={loading} size="small" text="create" onClick={handleButtonClick} />
        </Container>
    );
};

export default NewKanban;