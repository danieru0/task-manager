import styled from 'styled-components';
import { useDrop } from 'react-dnd'

import { useAppDispatch } from '../../app/hooks';

import { setModal } from '../../features/modal/modalSlice';
import { TaskInterface } from '../../features/team/teamSlice';

import Button from '../atoms/Button';
import Task from '../atoms/Task';

interface IKanbanCategory {
    kanbanId: string;
    projectId: string;
    name: string;
    tasks: TaskInterface[]
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

const TasksContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: auto;
    border-top: 3px solid black;
    padding-top: 30px;
    height: 100%;
`

const KanbanCategory = ({ kanbanId, projectId, name, tasks }: IKanbanCategory) => {
    const dispatch = useAppDispatch();
    const [, drop] = useDrop(() => ({
        accept: 'Task',
        drop: (item) => {
            console.log(item, kanbanId);
        }
    }))

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
            <TasksContainer ref={drop}>
                {
                    tasks.map(task => {
                        return <Task key={task.id} kanbanId={kanbanId} name={task.name} description={task.description} tag={task.tag} id={task.id} author={task.author} />
                    })
                }
            </TasksContainer>
        </Container>
    )
};

export default KanbanCategory;