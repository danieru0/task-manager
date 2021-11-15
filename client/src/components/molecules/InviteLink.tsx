import styled from 'styled-components';

import Button from '../atoms/Button';

interface IInviteLink {
    link: string;
}

const Container = styled.div`
    display: flex;
    margin-top: 15px;
`

const LinkText = styled.span`
    background: #EFF9FF;
    color: #072739;
    padding: 5px 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    width: 300px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`

const InviteLink = ({ link }: IInviteLink) => {
    return (
        <Container>
            <LinkText>
                {link}
            </LinkText>
            <Button size="small" text="generate new link" onClick={() => alert('generate')} />
        </Container>
    );
};

export default InviteLink;