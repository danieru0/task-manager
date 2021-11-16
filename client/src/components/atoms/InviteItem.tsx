import styled from 'styled-components';

import { UserInterface } from '../../features/team/teamSlice';

import Button from './Button';

interface IInviteItem extends UserInterface {
    onAcceptClick: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
    onRejectClick: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

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

const InviteItem = ({ picture, email, nickname, id, onAcceptClick, onRejectClick }: IInviteItem) => {
    return (
        <Container>
            <Avatar src={picture} />
            <UserData>{`${nickname} ${email}`}</UserData>
            <ButtonsWrapper>
                <StyledButton size="small" text="accept" onClick={(e: React.MouseEvent<HTMLButtonElement>) => onAcceptClick(e, id)} />
                <StyledButton size="small" text="reject" onClick={(e: React.MouseEvent<HTMLButtonElement>) => onRejectClick(e, id)} />
            </ButtonsWrapper>
        </Container>
    );
};

export default InviteItem;