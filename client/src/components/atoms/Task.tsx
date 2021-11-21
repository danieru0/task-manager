import styled from 'styled-components';
import { useDrag } from 'react-dnd'

import { TaskInterface } from '../../features/team/teamSlice';

interface ITask extends TaskInterface {
    kanbanId: string;
}

const Container = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    border-top: 1px solid black;
    padding-top: 30px;

    &:nth-of-type(1) {
        border-top: none;
        padding-top: 0px;
    }
`

const Title = styled.span`
    font-size: 20px;
    font-weight: bol;d
`

const Author = styled.span`
    font-size: 18px;
    color: ${({theme}) => theme.primaryDarker};
`

const Description = styled.span`
    font-size: 16px;
`

const Footer = styled.div`
    display: flex;
`

const Tag = styled.span`
    
`

const Task = ({ id, name, description, author, tag, kanbanId }: ITask) => {
    const [, drag ] = useDrag(() => ({
        type: 'Task',
        item: {id, kanbanId},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    return (
        <Container ref={drag}>
            <Title>{name}</Title>
            <Author>{author.nickname}</Author>
            <Description>{description}</Description>
            <Footer>
                <Tag>{tag}</Tag>
            </Footer>
        </Container>
    );
};

export default Task;