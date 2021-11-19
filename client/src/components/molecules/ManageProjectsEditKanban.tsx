import styled from 'styled-components';

import FormSectionTitle from '../atoms/FormSectionTitle';
import Input from '../atoms/Input';
import ManageProjectsItem from '../atoms/ManageProjectsItem';
import Button from '../atoms/Button';

import { ProjectInterface } from '../../features/team/teamSlice';

interface IManageProjectsEditKanban {
    project: ProjectInterface
    onNewKanbanClick: (id: string) => void;
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`

const Form = styled.form`
    width: 600px;
    display: flex;
    flex-direction: column;
`

const StyledFormSectionTitle = styled(FormSectionTitle)`
    margin-top: 50px;
    margin-bottom: 20px;

    &:nth-of-type(1) {
        margin-top: 0;
    }
`

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

const StyledButton = styled(Button)`
    align-self: flex-start;
    margin-left: 20px;
`

const ManageProjectsEditKanban = ({ project, onNewKanbanClick }: IManageProjectsEditKanban) => {
    return (
        <Container>
            <Form>
                <StyledFormSectionTitle text="General" />
                <Input placeholder="Name" onChange={() => {}} value="dupa" label="Project name" />
                <StyledFormSectionTitle text="Kanbans" />
                <StyledButton size="small" text="create new kanban" onClick={() => onNewKanbanClick(project.id)} />
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Tasks</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            project.kanbans.map(projectElement => {
                                return (
                                    <ManageProjectsItem key={projectElement.id} buttonsType="edit" id={projectElement.id} name={projectElement.name} tasksCounter={projectElement.tasks.length} />
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </Form>
        </Container>
    );
};

export default ManageProjectsEditKanban;