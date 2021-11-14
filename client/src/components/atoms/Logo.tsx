import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled(Link)`
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: ${({theme}) => theme.logo};
    font-size: 24px;
    text-decoration: none;
`

const Text = styled.span`
    line-height: 20px;
    text-transform: uppercase;
`

const Logo = () => {
    return (
        <Container to="/">
            <Text>Task</Text>
            <Text>Manager</Text>
        </Container>
    );
};

export default Logo;