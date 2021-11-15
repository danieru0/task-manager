import { gql, useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useAppDispatch } from '../../app/hooks';

import { setTeam } from "../../features/team/teamSlice";

const createTeamMutation = gql`
    mutation createTeam($name: String!, $authorId: String!) {
        createTeam(name: $name, authorId: $authorId) {
            name
            inviteLink
            users {
                name
            }
            projects {
                name
            }
        }
    }
`

const DashboardWithoutTeam = () => {
    const dispatch = useAppDispatch();
    const [ createTeam, { data } ] = useMutation(createTeamMutation, {
        onError: err => {

        }
    });
    const { user } = useAuth0();

    const handleCreateTeamButton = () => {
        createTeam({
            variables: {
                name: 'test',
                authorId: user!.sub
            }
        })
    }

    useEffect(() => {
        if (data) {
            dispatch(setTeam(data));
        }
    }, [data, dispatch])

    return (
        <div>
            no team
            <button onClick={handleCreateTeamButton}>team</button>
        </div>
    );
};

export default DashboardWithoutTeam;