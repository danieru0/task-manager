import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Text = styled.span`
    font-size: 54px;
`

const KickPage = () => {
    return (
        <Container>
            <Text>You have been kicked from the team!</Text>
        </Container>
    );
};

export default KickPage;