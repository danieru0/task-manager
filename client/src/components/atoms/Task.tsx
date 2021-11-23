import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useDrag } from 'react-dnd'
import { Link } from 'react-router-dom';

import { TaskInterface } from '../../features/team/teamSlice';

import Icon from './Icon';

interface ITask extends TaskInterface {
    kanbanId: string;
    onDrag: (isDragging: boolean, kanbanId: string) => void;
}

interface ContainerProps {
    isdragging: string;
}

const Container = styled.div<ContainerProps>`
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    flex-shrink: 0;

    &:nth-of-type(1) {
        border-top: none;
        padding-top: 0px;
    }

    ${({ theme, isdragging }) => isdragging && css`
        background: ${theme.primaryLighter};
    `}
`

const Title = styled(Link)`
    font-size: 20px;
    font-weight: bold;
`

const Author = styled.span`
    font-size: 18px;
    color: ${({theme}) => theme.primaryDarker};
`

const Description = styled.span`
    font-size: 16px;
    margin-top: 20px;
`

const Footer = styled.div`
    display: flex;
    margin-top: auto;
    justify-content: space-between;
    padding-bottom: 20px;
`

const Tag = styled.span`
    color: ${({theme}) => theme.tag};
    font-weight: bold;
    text-transform: uppercase;
    font-size: 16px;
`

const CommentsNumber = styled.div`
    color: ${({theme}) => theme.comments};
    font-size: 16px;
    display: flex;
    align-items: center;
`

const CommentsText = styled.span`
    margin-left: 10px;
`

const Task = ({ id, name, description, author, tag, kanbanId, comments, onDrag }: ITask) => {
    const [ { isDragging }, drag ] = useDrag(() => ({
        type: 'Task',
        item: {id, kanbanId},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    useEffect(() => {
        onDrag(isDragging, kanbanId);
    }, [isDragging]); //eslint-disable-line

    return (
        <Container isdragging={isDragging ? 'true' : ''} ref={drag}>
            <Title to={`${kanbanId}/${id}`}>{name}</Title>
            <Author>{author.nickname}</Author>
            <Description>{description}</Description>
            <Footer>
                <Tag>{tag}</Tag>
                <CommentsNumber>
                    <Icon icon="comment" />
                    <CommentsText>{comments.length}</CommentsText>
                </CommentsNumber>
            </Footer>
        </Container>
    );
};

export default Task;