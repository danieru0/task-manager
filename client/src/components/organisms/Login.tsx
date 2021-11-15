import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components';

import Button from '../atoms/Button';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const WelcomeText = styled.span`
    font-size: 54px;
    color: ${({theme}) => theme.secondary};
`

const ExplanationText = styled.span`
    font-size: 32px;
    color: ${({theme}) => theme.primaryDarker};
    margin-bottom: 40px;
`

const Login = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Container>
            <WelcomeText>Welcome to Task Manager!</WelcomeText>
            <ExplanationText>Before you use task manager app, please log in!</ExplanationText>
            <Button text="login" onClick={() => loginWithRedirect()} />
        </Container>
    );
};

export default Login;