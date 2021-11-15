import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components';

import Button from '../atoms/Button';
import WelcomeText from '../atoms/WelcomeText';
import ExplanationText from '../atoms/ExplanationText';

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

const Login = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Container>
            <WelcomeText>Welcome to Task Manager!</WelcomeText>
            <StyledExplanationText>Before you use task manager app, please log in!</StyledExplanationText>
            <Button text="login" onClick={() => loginWithRedirect()} />
        </Container>
    );
};

export default Login;