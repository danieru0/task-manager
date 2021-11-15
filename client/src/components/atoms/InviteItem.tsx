import styled from 'styled-components';

import Button from './Button';

const Container = styled.li`
    width: 100%;
    display: flex;
    margin: 10px 0px;
    align-items: center;

    &:nth-of-type(1) {
        margin: 0;
    }
`

const Avatar = styled.img`
    width: 50px;
    border-radius: 50%;
`

const UserData = styled.span`
    color: ${({theme}) => theme.primaryDarker};
    font-size: 20px;
    margin-left: 10px;
`

const ButtonsWrapper = styled.div`
    margin-left: auto;
`

const StyledButton = styled(Button)`
    margin: 0px 5px;
`

const InviteItem = () => {
    return (
        <Container>
            <Avatar src="https://i2.wp.com/cdn.auth0.com/avatars/el.png?ssl=1" />
            <UserData>
                elosik
                elosik@onet.pl
            </UserData>
            <ButtonsWrapper>
                <StyledButton size="small" text="accept" onClick={() => alert('accept')} />
                <StyledButton size="small" text="reject" onClick={() => alert('reject')} />
            </ButtonsWrapper>
        </Container>
    );
};

export default InviteItem;