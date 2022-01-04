import styled from 'styled-components';

import Button from '../atoms/Button';

interface IManageUsersItem {
    id: string;
    name: string;
    nickname: string;
    email: string;
    onUserKickClick: (id: string) => void;
}

const Tr = styled.tr`

`

const Td = styled.td`
    padding: 20px;
`

const ButtonsTd = styled.td`
    width: 0%;
`

const ButtonsWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`

const StyledButton = styled(Button)`
    margin: 0px 5px;
`

const ManageUsersItem = ({ id, name, nickname, email, onUserKickClick }: IManageUsersItem) => {
    return (
        <Tr>
            <Td>{name}</Td>
            <Td>{nickname}</Td>
            <Td>{email}</Td>
            <ButtonsTd>
                <ButtonsWrapper>
                    <StyledButton onClick={() => onUserKickClick(id)} text="kick" />
                </ButtonsWrapper>
            </ButtonsTd>
        </Tr>
    );
};

export default ManageUsersItem;