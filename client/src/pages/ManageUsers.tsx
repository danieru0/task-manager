import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { gql, useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";

import { useAppSelector, useAppDispatch } from '../app/hooks';

import { selectTeam, deleteUserFromTeam } from '../features/team/teamSlice';

import ManageUsersTable from '../components/molecules/ManageUsersTable';

const kickFromTeamMutation = gql`
    mutation kickFromTeam($teamId: String!, $userId: String!) {
        kickFromTeam(teamId: $teamId, userId: $userId)
    }
`

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

const Users = () => {
    const dispatch = useAppDispatch();
    const teamSelector = useAppSelector(selectTeam);
    const [ userIdToKick, setUserIdToKick ] = useState('');
    const { user } = useAuth0();
    const [ kickFromTeam, { data } ] = useMutation(kickFromTeamMutation);

    const handleUserClick = (id: string) => {
        if (window.confirm('Are you sure you want to kick this user?')) {
            setUserIdToKick(id);
    
            kickFromTeam({
                variables: {
                    teamId: teamSelector.team!.id,
                    userId: id
                }
            })
        }
    }

    useEffect(() => {
        if (data) {
            dispatch(deleteUserFromTeam(userIdToKick));
        }
    }, [data, dispatch, userIdToKick]);

    return (
        <Container>
            <Header>
                <PageTitle>Manage Users</PageTitle>
            </Header>
            <ManageUsersTable currentUserId={user ? user.sub! : ''} onUserKickClick={handleUserClick} users={teamSelector.team ? teamSelector.team.users : []} />
        </Container>
    );
};

export default Users;