import styled from 'styled-components';

import { WorkingTasksInterface } from '../../features/user/userSlice';

interface IYourTasks {
    tasks: WorkingTasksInterface[];
}

const ContainerTable = styled.table`
    width: 800px;
    margin-top: 10px;
`

const NoTasks = styled.span`
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

const YourTasks = ({ tasks }: IYourTasks) => {
    if (tasks.length === 0) {
        return (
            <NoTasks>
                You don't have any tasks
            </NoTasks>
        )
    }

    return (
        <ContainerTable>
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Stage</Th>
                    <Th>Team</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    tasks.map(task => {
                        return (
                            <Tr key={task.id}>
                                <Td>{task.name}</Td>
                                <Td>{task.stage}</Td>
                                <Td>{task.projectName}</Td>
                            </Tr>
                        )
                    })
                }
            </Tbody>
        </ContainerTable>
    );
};

export default YourTasks;