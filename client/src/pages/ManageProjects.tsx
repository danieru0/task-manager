import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../app/hooks';

import { setModal } from '../features/modal/modalSlice';
import { selectTeam } from '../features/team/teamSlice';

import ManageProjectsTable from '../components/molecules/ManageProjectsTable';
import Button from '../components/atoms/Button';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0px 50px;
`

const Header = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const PageTitle = styled.span`
    color: ${({theme}) => theme.secondary};
    font-size: 28px;
    font-weight: bold;
`

const ManageProjects = () => {
    const dispatch = useAppDispatch();
    const teamSelector = useAppSelector(selectTeam);

    const handleNewProjectClick = () => {
        dispatch(setModal('new-project'));
    }

    return (
        <Container>
            <Header>
                <PageTitle>Manage Projects</PageTitle>
                <Button onClick={handleNewProjectClick} text="new project" />
            </Header>
            <ManageProjectsTable projects={teamSelector.team?.projects} />
        </Container>
    );
};

export default ManageProjects;