import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { gql, useMutation } from "@apollo/client";

import { TaskInterface } from '../../../features/team/teamSlice';

import CloseModalButton from './CloseModalButton';
import Input from '../../atoms/Input';
import TextArea from '../../atoms/TextArea';
import Button from '../../atoms/Button'

interface INewTask {
    teamId: string | undefined;
    projectId: string | undefined;
    kanbanId: string | undefined;
    onSuccessTaskAdd: (taskData: TaskInterface, projectId: string | undefined, kanbanId: string | undefined) => void;
    onCloseClick: () => void;
}

const createTaskMutation = gql`
    mutation createTask($name: String!, $description: String!, $tag: String!, $teamId: String!, $projectId: String!, $kanbanId: String!) {
        createTask(name: $name, description: $description, tag: $tag, teamId: $teamId, projectId: $projectId, kanbanId: $kanbanId) {
            id
            name
            author {
                nickname
            }
            description
            tag
        }
    }
`

const Container = styled.div`
    width: 500px;
    height: 500px;
    background: ${({theme}) => theme.primary};
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const StyledTextArea = styled(TextArea)`
    margin: 20px 0px;
`

const StyledButton = styled(Button)`
    margin-top: 20px;
`

const NewTask = ({ teamId, projectId, kanbanId, onSuccessTaskAdd, onCloseClick }: INewTask) => {
    const [ taskName, setTaskName ] = useState('');
    const [ taskDescription, setTaskDescription ] = useState('');
    const [ taskTag, setTaskTag ] = useState('');
    const [ createTask, { data, loading } ] = useMutation(createTaskMutation);

    useEffect(() => {
        if (data) {
            onSuccessTaskAdd(data.createTask, projectId, kanbanId);
        }
    }, [data]) //eslint-disable-line

    const handleNewTaskClick = () => {
        if (taskName.trim().length > 0 && taskDescription.trim().length > 0 && taskTag.trim().length > 0 && !loading) {
            createTask({
                variables: {
                    name: taskName,
                    description: taskDescription,
                    tag: taskTag,
                    teamId,
                    projectId,
                    kanbanId
                }
            })
        }
    }

    return (
        <Container>
            <CloseModalButton icon="times" onClick={onCloseClick} />
            <Input value={taskName} placeholder="Task name" onChange={e => setTaskName(e.target.value)} />
            <StyledTextArea value={taskDescription} placeholder="Task description" onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTaskDescription(e.target.value)} />
            <Input value={taskTag} placeholder="Task tag" onChange={e => setTaskTag(e.target.value)} />
            <StyledButton loading={loading} size="small" text="add" onClick={handleNewTaskClick} />
        </Container>
    );
};

export default NewTask;