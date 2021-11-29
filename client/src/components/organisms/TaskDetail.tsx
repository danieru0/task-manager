import { useEffect, useState } from "react";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import { useAppDispatch } from '../../app/hooks';
import { useAuth0 } from "@auth0/auth0-react";

import { addComment, ProjectInterface, TaskInterface } from "../../features/team/teamSlice";

import TextArea from "../atoms/TextArea";
import Button from "../atoms/Button";
import CommentElement from '../atoms/Comment';

const createCommentMutation = gql`
    mutation createComment($taskId: String!, $kanbanId: String!, $projectId: String!, $teamId: String!, $text: String!) {
        createComment(taskId: $taskId, kanbanId: $kanbanId, projectId: $projectId, teamId: $teamId, text: $text) {
            id
            author {
                picture
                nickname
            }
            text
        }
    }
`

interface ITaskDetail {
    taskId: string;
    kanbanId: string;
    teamId: string;
    project: ProjectInterface;
}

const Container = styled.div`
    width: 100%;
    height: calc(100% - 150px);
    display: flex;
    flex-direction: column;
`

const Header = styled.div`
    display: flex;
    flex-direction: column;
`

const TaskTitle = styled.span`
    font-size: 28px;
    font-weight: bold;
`

const Avatar = styled.img`
    border-radius: 100%;
    width: 50px;
`

const UsersWorkingWrapper = styled.div`
    ${Avatar} {
        width: 30px;
    }
`

const DescriptionWrapper = styled.div`
    display: flex;
    margin-top: 50px;
`


const Description = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`

const Author = styled.span`
    font-size: 18px;
    font-weight: bold;
`

const Text = styled.span`
    margin-top: 10px;
`

const CommentWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    margin-top: 30px;
`

const Comment = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    align-items: flex-start;
`

const StyledButton = styled(Button)`
    margin-top: 10px;
`

const CommentsWrapper = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
`

const CommentsSectionName = styled.span`
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 20px;
`

const TaskDetail = ({ taskId, kanbanId, project, teamId }: ITaskDetail) => {
    const dispatch = useAppDispatch();
    const { user } = useAuth0();
    const [ createComment, { data: commentData, loading } ] = useMutation(createCommentMutation);
    const [ commentValue, setCommentValue ] = useState('');
    const [ task, setTask ] = useState<TaskInterface | null>(null);

    useEffect(() => {
        const kanban = project.kanbans.find(kanban => kanban.id === kanbanId)!;
        const task = kanban.tasks.find(task => task.id === taskId)!;

        setTask(task);
    }, []); //eslint-disable-line

    useEffect(() => {
        if (commentData) {
            dispatch(addComment({
                projectId: project.id,
                kanbanId,
                taskId,
                comment: commentData.createComment
            }));

            setTask(prev => ({
                ...prev as TaskInterface,
                comments: [...prev!.comments, commentData.createComment]
            }))
        }
    }, [commentData, kanbanId, taskId, dispatch]); //eslint-disable-line

    const handleAddCommentClick = () => {
        if (commentValue.trim().length > 0) {
            createComment({
                variables: {
                    taskId,
                    kanbanId,
                    projectId: project.id,
                    teamId,
                    text: commentValue
                }
            })
        }
    }
    
    if (task === null) return <span>loading</span>;

    return (
        <Container>
            <Header>
                <TaskTitle>{task.name}</TaskTitle>
                <UsersWorkingWrapper>
                    {
                        task.workingUsers && task.workingUsers.map(user => {
                            return <Avatar src={user.picture} />
                        })
                    }
                </UsersWorkingWrapper>
            </Header>
            <DescriptionWrapper>
                <Avatar src={task.author.picture} />
                <Description>
                    <Author>{task.author.nickname}</Author>
                    <Text>{task.description}</Text>
                </Description>
            </DescriptionWrapper>
            <CommentWrapper>
                <Avatar src={user?.picture} />
                <Comment>
                    <TextArea placeholder="Make comment" onChange={(e) => setCommentValue(e.target.value)} value={commentValue} />
                    <StyledButton loading={loading} text="Make comment" size="small" onClick={handleAddCommentClick} />
                </Comment>
            </CommentWrapper>
            <CommentsWrapper>
                <CommentsSectionName>{`${task.comments ? task.comments.length : 0} comments`}</CommentsSectionName>
                {
                    task.comments && task.comments.map(comment => {
                        return <CommentElement key={comment.id} avatar={comment.author.picture} comment={comment.text} name={comment.author.nickname} />
                    })
                }
            </CommentsWrapper>
        </Container>
    );
};

export default TaskDetail;