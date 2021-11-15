import styled from 'styled-components';

const Container = styled.table`
    width: 800px;
    margin-top: 10px;
`

const Thead = styled.thead`
    font-size: 20px;
`

const Tr = styled.tr`

`

const Th = styled.th`

`

const Tbody = styled.tbody`
    font-size: 18px;
`

const Td = styled.td`
    text-align: center;
    padding: 20px;
`

const YourTasks = () => {
    return (
        <Container>
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Stage</Th>
                    <Th>Team</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>Create new framework</Td>
                    <Td>In process</Td>
                    <Td>mojoo.com</Td>
                </Tr>
                <Tr>
                    <Td>Create new framework</Td>
                    <Td>In process</Td>
                    <Td>mojoo.com</Td>
                </Tr>
            </Tbody>
        </Container>
    );
};

export default YourTasks;