import styled from 'styled-components';

import InviteItem from '../atoms/InviteItem';

const Container = styled.div`
    width: 800px;
    background: ${({theme}) => theme.navActiveBg};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding: 20px;
    margin-bottom: 15px;
`

const InvitesList = styled.ul`
    width: 100%;
    list-style: none;
`


const NoInvitesText = styled.span`
    font-size: 20px;
`

const InviteRequests = () => {
    return (
        <Container>
            <InvitesList>
                <InviteItem />
            </InvitesList>
        </Container>
    );
};

export default InviteRequests;