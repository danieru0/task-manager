import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Button from '../atoms/Button';

type buttonsType = 'table' | 'edit';

interface IManageProjectsItem {
    id: string;
    tasksCounter: number;
    name: string;
    buttonsType: buttonsType;
    onKanbanDeleteClick?: (kanbanId: string) => void;
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

const ManageProjectsItem = ({ name, tasksCounter, id, buttonsType, onKanbanDeleteClick }: IManageProjectsItem) => {
    const navigate = useNavigate();

    return (
        <Tr>
            <Td>{name}</Td>
            <Td>{tasksCounter}</Td>
            <ButtonsTd>
                <ButtonsWrapper>
                    {
                        buttonsType === 'table' ? (
                            <>
                                <StyledButton onClick={() => navigate(`${id}`)} text="edit" />
                                <StyledButton onClick={() => alert('remove')} text="remove" />
                            </>
                        ) : (
                            <>
                                <StyledButton size="small" onClick={() => onKanbanDeleteClick && onKanbanDeleteClick(id)} text="remove" />
                            </>
                        )
                    }
                </ButtonsWrapper>
            </ButtonsTd>
        </Tr>
    );
};

export default ManageProjectsItem;