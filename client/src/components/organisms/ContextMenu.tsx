import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { selectContext, setContextMenu, ContextTypes } from '../../features/context/contextSlice';
import { selectTeam } from '../../features/team/teamSlice';
import { selectUser } from '../../features/user/userSlice';

import TaskMenu from '../molecules/ContextMenus/TaskMenu';

interface ContainerProps {
    x: number;
    y: number;
}

const Container = styled.div<ContainerProps>`
    position: absolute;
    left: ${({ x }) => x}px;
    top: ${({ y }) => y}px;
    display: flex;
    flex-direction: column;
`

const ContextMenu = () => {
    const dispatch = useAppDispatch();
    const contextSelector = useAppSelector(selectContext);
    const teamSelector = useAppSelector(selectTeam);
    const userSelector = useAppSelector(selectUser);

    useEffect(() => {
        const handleOutsideClick = () => {
            if (contextSelector.contextName.length > 0) {
                dispatch(setContextMenu({
                    contextName: '',
                    pos: {
                        x: 0,
                        y: 0
                    }
                }))
            }
        }

        document.addEventListener('click', handleOutsideClick);

        return () => document.removeEventListener('click', handleOutsideClick);
    }, [contextSelector.contextName.length, dispatch]);

    const handleContextMenuSwitch = (name: ContextTypes) => {
        switch(name) {
            case 'task':
                return <TaskMenu teamId={teamSelector.team?.id} tasks={userSelector.workingTasks} taskId={contextSelector.variables?.taskId} projectId={contextSelector.variables?.projectId} kanbanId={contextSelector.variables?.kanbanId} />
            default: throw new Error('Wrong context menu type');
        }
    }

    if (contextSelector.contextName.length === 0) return <></>

    return (
        <Container x={contextSelector.pos.x} y={contextSelector.pos.y}>
            { handleContextMenuSwitch(contextSelector.contextName) }
        </Container>
    );
};

export default ContextMenu;