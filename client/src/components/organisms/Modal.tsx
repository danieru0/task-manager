import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { selectModal, setModal, ModalTypes } from '../../features/modal/modalSlice';
import { selectTeam, ProjectInterface, addProject, addKanban, addTask, KanbanInterface, TaskInterface } from '../../features/team/teamSlice';

import NewProject from '../molecules/Modals/NewProject';
import NewKanban from '../molecules/Modals/NewKanban';
import NewTask from '../molecules/Modals/NewTask';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999999999;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`

const Modal = () => {
    const dispatch = useAppDispatch();
    const modalSelector = useAppSelector(selectModal);
    const teamSelector = useAppSelector(selectTeam);

    const handleCloseClick = () => {
        dispatch(setModal({
            modalName: ''
        }));
    }

    const handleNewProjectAdd = (data: ProjectInterface) => {
        dispatch(addProject(data));
        handleCloseClick();
    }

    const handleNewKanbanAdd = (data: KanbanInterface, projectId: string | undefined) => {
        dispatch(addKanban({
            projectId: projectId as string,
            kanban: data
        }))
        handleCloseClick();
    }

    const handleNewTaskAdd = (data: TaskInterface, projectId: string | undefined, kanbanId: string | undefined) => {
        dispatch(addTask({
            projectId: projectId as string,
            kanbanId: kanbanId as string,
            task: data
        }))
        handleCloseClick();
    }

    const HandleModalSwitch = (name: ModalTypes) => {
        switch(name) {
            case 'new-project':
                return <NewProject onSuccessProjectAdd={handleNewProjectAdd} teamId={teamSelector.team?.id} onCloseClick={handleCloseClick} />
            case 'new-kanban':
                return <NewKanban onSuccessKanbanAdd={handleNewKanbanAdd} projectId={modalSelector.variables?.projectId} teamId={teamSelector.team?.id} onCloseClick={handleCloseClick} />    
            case 'new-task':
                return <NewTask onSuccessTaskAdd={handleNewTaskAdd} teamId={teamSelector.team?.id} projectId={modalSelector.variables?.projectId} kanbanId={modalSelector.variables?.kanbanId} onCloseClick={handleCloseClick} />
            default: throw new Error('Wrong modal type');
        }
    }

    if (modalSelector.modalName.length === 0) return <></>

    return (
        <Container>
            { HandleModalSwitch(modalSelector.modalName) }
        </Container>
    );
};

export default Modal;