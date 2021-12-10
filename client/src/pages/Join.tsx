import { useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Navigate } from 'react-router';
import { useAuth0 } from "@auth0/auth0-react";
import { gql, useMutation } from "@apollo/client";

import WelcomeText from '../components/atoms/WelcomeText';
import ExplanationText from '../components/atoms/ExplanationText';

const joinTeamMutation = gql`
    mutation joinTeamRequest($inviteId: String!) {
        joinTeamRequest(inviteId: $inviteId)
    }
`

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Join = () => {
    const { id } = useParams();
    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [ joinTeam ] = useMutation(joinTeamMutation, {
        onError: err => {
            console.log(err);
        }
    });

    useEffect(() => {
        const sendMutation = async () => {
            const token = await getAccessTokenSilently();
            
            joinTeam({
                variables: {
                    inviteId: `/#/join/${id}`
                },
                context: {
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                }
            })
        }

        sendMutation();
    }, [id, joinTeam, getAccessTokenSilently])

    if (!isAuthenticated && !isLoading) return <Navigate replace to="/" />

    return (
        <Container>
            <WelcomeText>The invite request has been send!</WelcomeText> 
            <ExplanationText>Please wait for acceptation</ExplanationText>
        </Container>
    );
};

export default Join;