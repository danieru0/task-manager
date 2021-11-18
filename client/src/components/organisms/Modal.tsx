import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { selectModal, setModal, ModalTypes } from '../../features/modal/modalSlice';
import { selectTeam, ProjectInterface, addProject } from '../../features/team/teamSlice';

import NewProject from '../molecules/Modals/NewProject';

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
        dispatch(setModal(''));
    }

    const handleNewProjectAdd = (data: ProjectInterface) => {
        dispatch(addProject(data));
        handleCloseClick();
    }

    const HandleModalSwitch = (name: ModalTypes) => {
        switch(name) {
            case 'new-project':
                return <NewProject onSuccessProjectAdd={handleNewProjectAdd} teamId={teamSelector.team?.id} onCloseClick={handleCloseClick} />
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