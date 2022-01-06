import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { gql, useMutation } from "@apollo/client";

import FormSectionTitle from '../components/atoms/FormSectionTitle';
import Checkbox from '../components/atoms/Checkbox';
import Button from '../components/atoms/Button';

import { useAppSelector, useAppDispatch } from '../app/hooks';

import { selectTeam, updateAcceptInvitesSetting } from '../features/team/teamSlice';

const setAcceptInvitesSettingMutation = gql`
    mutation setAcceptInvitesSetting($teamId: String!, $value: Boolean!) {
        setAcceptInvitesSetting(teamId: $teamId, value: $value)
    }
`

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0px 50px;
`

const Header = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const PageTitle = styled.span`
    color: ${({theme}) => theme.secondary};
    font-size: 28px;
    font-weight: bold;
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

const GeneralButton = styled(Button)`
    margin-top: 50px;
    align-self: flex-start;
`

const StyledButton = styled(Button)`
    align-self: flex-start;
`

const ManageTeam = () => {
    const dispatch = useAppDispatch();
    const teamSelector = useAppSelector(selectTeam);
    const [ acceptInvitesCheckboxValue, setAcceptInvitesCheckboxValue ] = useState(true)
    const [ isCompleted, setIsCompleted ] = useState(false);
    const [ setAcceptInvitesSetting ] = useMutation(setAcceptInvitesSettingMutation, {
        onCompleted: () => {
            setIsCompleted(true)
        }
    });

    const handleSaveButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setAcceptInvitesSetting({
            variables: {
                teamId: teamSelector.team!.id,
                value: acceptInvitesCheckboxValue
            }
        })
    }

    useEffect(() => {
        if (teamSelector.team) {
            setAcceptInvitesCheckboxValue(teamSelector.team.settings.acceptInvites);
        }
    }, [teamSelector.team]);

    useEffect(() => {
        if (isCompleted) {
            dispatch(updateAcceptInvitesSetting(acceptInvitesCheckboxValue));
            setIsCompleted(false);
        }
    }, [isCompleted, acceptInvitesCheckboxValue, dispatch]);

    if (!teamSelector.team) return <p>loading</p>

    return (
        <Container>
            <Header>
                <PageTitle>Manage Team</PageTitle>
            </Header>
            <Form>
                <StyledFormSectionTitle text="General" />
                <Checkbox onClick={() => setAcceptInvitesCheckboxValue(prev => !prev)} checked={acceptInvitesCheckboxValue} text="Accept invites" />
                <GeneralButton text="Save" onClick={handleSaveButton} />
                <StyledFormSectionTitle text="Delete" />
                <StyledButton text="Delete team" onClick={() => {}} />
            </Form>
        </Container>
    );
};

export default ManageTeam;