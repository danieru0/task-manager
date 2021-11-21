import styled from 'styled-components';

import { ProjectInterface } from '../../features/team/teamSlice';

import KanbanCategory from '../molecules/KanbanCategory';

interface IKanban {
    project: ProjectInterface
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
`

const Kanban = ({ project }: IKanban) => {
    return (
        <Container>
            {
                project.kanbans.map(kanban => {
                    return <KanbanCategory key={kanban.id} projectId={project.id} kanbanId={kanban.id} tasks={kanban.tasks} name={kanban.name} />
                })
            }
        </Container>
    )
};

export default Kanban;