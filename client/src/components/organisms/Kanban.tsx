import { useState } from 'react';
import styled from 'styled-components';

import { ProjectInterface } from '../../features/team/teamSlice';

import KanbanCategory from '../molecules/KanbanCategory';

interface IKanban {
    project: ProjectInterface
}

const Container = styled.div`
    width: 100%;
    height: calc(100% - 150px);
    display: flex;
    justify-content: space-around;
    position: relative;
`

const LoadingWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
`

const Kanban = ({ project }: IKanban) => {
    const [ draggedKanbanId, setDraggedKanbanId ] = useState('');
    const [ isTaskMoveLoading, setIsTaskMoveLoading ] = useState(false);

    const handleTaskDrag = (isDragging: boolean, kanbanId: string) => {
        if (isDragging) {
            setDraggedKanbanId(kanbanId)
        } else {
            setDraggedKanbanId('');
        }
    }

    return (
        <Container>
            { isTaskMoveLoading && <LoadingWrapper />}
            {
                project.kanbans.map(kanban => {
                    return <KanbanCategory isAlreadyLoading={isTaskMoveLoading} handleTaskMoveLoading={(loading: boolean) => setIsTaskMoveLoading(loading)} active={draggedKanbanId ? draggedKanbanId !== kanban.id : false} onDrag={handleTaskDrag} key={kanban.id} projectId={project.id} kanbanId={kanban.id} tasks={kanban.tasks} name={kanban.name} />
                })
            }
        </Container>
    )
};

export default Kanban;