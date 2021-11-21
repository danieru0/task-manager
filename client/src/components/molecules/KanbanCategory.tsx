import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useDrop } from 'react-dnd'
import { gql, useMutation } from "@apollo/client";

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { setModal } from '../../features/modal/modalSlice';
import { selectTeam, moveTask, TaskInterface } from '../../features/team/teamSlice';

import Button from '../atoms/Button';
import Task from '../atoms/Task';

const moveTaskMutation = gql`
    mutation moveTask($taskId: String!, $teamId: String!, $projectId: String!, $kanbanIdFrom: String!, $kanbanIdTo: String!) {
        moveTask(taskId: $taskId, teamId: $teamId, projectId: $projectId, kanbanIdFrom: $kanbanIdFrom, kanbanIdTo: $kanbanIdTo) {
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

interface IKanbanCategory {
    kanbanId: string;
    projectId: string;
    name: string;
    tasks: TaskInterface[];
    active: boolean;
    isAlreadyLoading: boolean;
    onDrag: (isDragging: boolean, kanbanId: string) => void;
    handleTaskMoveLoading: (loading: boolean) => void;
}

interface TaskContainerProps {
    active: string;
}

interface DroppedTaskInterface {
    id: string;
    kanbanId: string;
}

const Container = styled.div`
    width: 300px;
    height: 100%;
`

const Header = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
`

const KanbanName = styled.span`
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 5px;
`

const TasksNumberText = styled.span`
    font-size: 20px;
    color: ${({theme}) => theme.primaryDarker};
    margin-bottom: 30px;
`

const TasksContainer = styled.div<TaskContainerProps>`
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: auto;
    border-top: 3px solid black;
    padding-top: 30px;
    height: 100%;

    ${({ theme, active }) => active && css`
        background: ${({theme}) => theme.primaryLighter};
    `}
`

const DummyTask = styled.div`
    width: 100%;
    height: 200px;
`

const KanbanCategory = ({ kanbanId, projectId, name, tasks, active, isAlreadyLoading, onDrag, handleTaskMoveLoading }: IKanbanCategory) => {
    const dispatch = useAppDispatch();
    const teamSelector = useAppSelector(selectTeam);
    const [ droppedTask, setDroppedTask ] = useState<DroppedTaskInterface>({
        id: '',
        kanbanId: ''
    })
    const [ moveTaskMut, { data, loading } ] = useMutation(moveTaskMutation);
    const [ { isOver }, drop] = useDrop(() => ({
        accept: 'Task',
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
        hover: (item: DroppedTaskInterface) => {
            setDroppedTask({
                id: item.id,
                kanbanId: item.kanbanId
            });
        },
        drop: (item: DroppedTaskInterface) => {
            if (!isAlreadyLoading && item.kanbanId !== kanbanId) {
                moveTaskMut({
                    variables: {
                        taskId: item.id,
                        teamId: teamSelector.team!.id,
                        projectId,
                        kanbanIdFrom: item.kanbanId,
                        kanbanIdTo: kanbanId
                    }
                })
            }
        }
    }))

    useEffect(() => {
        handleTaskMoveLoading(loading);
    }, [loading]); //eslint-disable-line

    useEffect(() => {
        if (data) {
            dispatch(moveTask({
                projectId,
                kanbanIdFrom: droppedTask.kanbanId,
                kanbanIdTo: kanbanId,
                task: data.moveTask
            }));
        }
    }, [data, dispatch]); //eslint-disable-line

    const handleNewTaskClick = () => {
        dispatch(setModal({
            modalName: 'new-task',
            variables: {
                kanbanId,
                projectId
            }
        }))
    }

    return (
        <Container>
            <Header>
                <KanbanName>{name}</KanbanName>
                <TasksNumberText>{`${tasks.length} tasks available`}</TasksNumberText>
                <Button text="add new" onClick={handleNewTaskClick} />
            </Header>
            <TasksContainer active={active ? 'true' : ''} ref={drop}>
                { isOver && droppedTask.kanbanId !== kanbanId && <DummyTask />}
                {
                    [...tasks].reverse().map(task => {
                        return <Task onDrag={onDrag} key={task.id} kanbanId={kanbanId} name={task.name} description={task.description} tag={task.tag} id={task.id} author={task.author} />
                    })
                }
            </TasksContainer>
        </Container>
    )
};

export default KanbanCategory;