import styled from 'styled-components';
import { gql, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';

import { selectTeam } from "../../features/team/teamSlice";
import { selectUser } from '../../features/user/userSlice';

import Button from '../atoms/Button';

import DashboardInfoBlock from '../molecules/DashboardInfoBlock';
import InviteLink from '../molecules/InviteLink';
import InviteRequests from '../molecules/InviteRequests';
import YourTasks from '../molecules/YourTasks';

const isAuthorOfTeam = gql`
    query isAuthorOfTeam($userId: String!) {
        isAuthorOfTeam(userId: $userId)
    }
`

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const TeamName = styled.span`
    font-size: 32px;
`

const SectionName = styled.span`
    font-size: 24px;
`

const InfoBlocks = styled.div`
    display: flex;
    margin-top: 15px;
    margin-bottom: 25px;
`

const StyledInfobBlock = styled(DashboardInfoBlock)`
    margin: 0px 30px;

    &:nth-of-type(1) {
        margin-left: 0px;
    }
`

const ManageButtons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
    margin-top: 10px;
    margin-bottom: 15px;
`

const DashboardWithTeam = () => {
    const { user } = useAuth0();
    const navigate = useNavigate();
    const teamSelector = useAppSelector(selectTeam);
    const userSelector = useAppSelector(selectUser);
    const { data, loading } = useQuery(isAuthorOfTeam, {
        variables: {
            userId: user!.sub
        }
    });

    const handleManageProjectsButton = () => {
        navigate('manage-projects');
    }

    if (!teamSelector.team || loading) return <span>loading</span>

    return (
        <Container>
            <TeamName>{teamSelector.team!.name}</TeamName>
            {data && data.isAuthorOfTeam && (
                <> 
                    <InfoBlocks>
                        <StyledInfobBlock />
                        <StyledInfobBlock />
                        <StyledInfobBlock />
                        <StyledInfobBlock />
                    </InfoBlocks>
                    <SectionName>Invite link</SectionName>
                    <InviteLink link={window.location.href.split('/#/')[0] + teamSelector.team!.inviteLink} />
                    <InviteRequests teamId={teamSelector.team!.id} users={teamSelector.team!.inviteRequests} />
                    <SectionName>Manage</SectionName>
                    <ManageButtons>
                        <Button size="large" onClick={() => alert('manage')} text="manage users" />
                        <Button size="large" onClick={handleManageProjectsButton} text="manage projects" />
                        <Button size="large" onClick={() => alert('manage')} text="manage team" />
                    </ManageButtons>
                </>
            )}
            <SectionName>Your tasks</SectionName>
            <YourTasks tasks={userSelector.workingTasks} />
        </Container>
    );
};

export default DashboardWithTeam;