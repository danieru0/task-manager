import styled from 'styled-components';

interface IDashboardInfoBlock {
    [key: string]: any;
}

const Container = styled.div`
    width: 200px;
    height: 150px;
    border-radius: 20px;
    background: ${({theme}) => theme.navActiveBg};
`

const DashboardInfoBlock = ({...props}: IDashboardInfoBlock) => {
    return (
        <Container {...props}>
            
        </Container>
    );
};

export default DashboardInfoBlock;