import styled from 'styled-components';
import { gql, useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useAppDispatch } from '../../app/hooks';

import { setTeam } from "../../features/team/teamSlice";

import Button from '../atoms/Button';
import WelcomeText from '../atoms/WelcomeText';
import ExplanationText from '../atoms/ExplanationText';

const createTeamMutation = gql`
    mutation createTeam($name: String!, $authorId: String!) {
        createTeam(name: $name, authorId: $authorId) {
            name
            inviteLink
            users {
                name
            }
            projects {
                name
            }
        }
    }
`

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const StyledExplanationText = styled(ExplanationText)`
    margin-bottom: 40px;
`

const DashboardWithoutTeam = () => {
    const dispatch = useAppDispatch();
    const [ createTeam, { data } ] = useMutation(createTeamMutation, {
        onError: err => {

        }
    });
    const { user } = useAuth0();

    const handleCreateTeamButton = () => {
        createTeam({
            variables: {
                name: 'test',
                authorId: user!.sub
            }
        })
    }

    useEffect(() => {
        if (data) {
            dispatch(setTeam(data));
        }
    }, [data, dispatch])

    return (
        <Container>
            <WelcomeText>Welcome to Task Manager!</WelcomeText>
            <StyledExplanationText>Now, create a new team or wait for someone to send you a link to their team!</StyledExplanationText>
            <Button text="create a team" onClick={handleCreateTeamButton} />
        </Container>
    );
};

export default DashboardWithoutTeam;