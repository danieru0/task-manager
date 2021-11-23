import styled from 'styled-components';

interface IComment {
    avatar: string;
    name: string;
    comment: string;
}

const Container = styled.div`
    display: flex;
    align-items: center;
    margin: 5px 0px;
`

const Avatar = styled.img`
    width: 30px;
    border-radius: 100%;
    margin-right: 10px;
`

const Author = styled.span`
    font-weight: bold;
    font-size: 16px;
`

const Text = styled.span`
    margin-left: 5px;
`

const CommentElement = ({ avatar, name, comment }: IComment) => {
    return (
        <Container>
            <Avatar src={avatar} />
            <Author>{name}</Author>
            <Text>{comment}</Text>
        </Container>
    );
};

export default CommentElement;