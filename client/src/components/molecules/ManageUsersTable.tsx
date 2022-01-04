import styled from 'styled-components';

import { UserInterface } from '../../features/team/teamSlice';

import ManageUsersItem from '../atoms/ManageUsersItem';

interface IManageUsersTable {
    users: UserInterface[]
    currentUserId: string;
    onUserKickClick: (id: string) => void;
}

const Table = styled.table`
    width: 100%;
`

const Thead = styled.thead`
    font-size: 20px;
`

const Tr = styled.tr`

`

const Th = styled.th`
    padding: 20px;
    text-align: left;
`

const Tbody = styled.tbody`
    font-size: 18px;
`

const ManageUsersTable = ({ users, currentUserId, onUserKickClick }: IManageUsersTable) => {
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Nickname</Th>
                    <Th>Email</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    users && users.map(user => {
                        if (user.id === currentUserId) return null;
                        
                        return <ManageUsersItem id={user.id} name={user.name} nickname={user.nickname} email={user.email} onUserKickClick={onUserKickClick} />
                    })
                }
            </Tbody>
        </Table>
    );
};

export default ManageUsersTable;