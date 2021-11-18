import styled from 'styled-components';

import Button from '../atoms/Button';

interface IManageProjectsItem {
    id: string;
    tasksCounter: number;
    name: string;
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

const ManageProjectsItem = ({ name, tasksCounter, id }: IManageProjectsItem) => {
    return (
        <Tr>
            <Td>{name}</Td>
            <Td>{tasksCounter}</Td>
            <ButtonsTd>
                <ButtonsWrapper>
                    <StyledButton onClick={() => alert('edit')} text="edit" />
                    <StyledButton onClick={() => alert('remove')} text="remove" />
                </ButtonsWrapper>
            </ButtonsTd>
        </Tr>
    );
};

export default ManageProjectsItem;