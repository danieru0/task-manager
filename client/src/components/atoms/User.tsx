import styled from 'styled-components';
import { useAuth0 } from "@auth0/auth0-react";

const Container = styled.div`
    display: flex;
    align-items: center;
`

const Avatar = styled.img`
    width: 40px;
    border-radius: 50%;
`

const Nick = styled.span`
    font-size: 18px;
    margin-left: 10px;
`

const User = () => {
    const { user } = useAuth0();

    if (!user) return <span></span>

    return (
        <Container>
            <Avatar src={user.picture} />
            <Nick>{user.nickname}</Nick>
        </Container>
    );
};

export default User;