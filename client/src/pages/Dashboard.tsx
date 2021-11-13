import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useAppSelector, useAppDispatch } from '../app/hooks';

import { setTeam, selectTeam } from "../features/team/teamSlice";

import Login from '../components/organisms/Login';
import DashboardWithoutTeam from "../components/organisms/DashboardWithoutTeam";
import DashboardWithTeam from "../components/organisms/DashboardWithTeam";

// This is used as well to check if user is in team
const createUserMutation = gql`
    mutation createUser($id: String!, $email: String!, $name: String!, $nickname: String!, $picture: String!) {
        createUser(id: $id, email: $email, name: $name, nickname: $nickname, picture: $picture) {
            team {
                name
                projects {
                    name
                }
                users {
                    name
                }
            }
        }
    }
`

const Dashboard = () => {
    const teamSelector = useAppSelector(selectTeam)
    const dispatch = useAppDispatch();
    const { isAuthenticated, isLoading, getAccessTokenSilently, user } = useAuth0();
    const [ createUser, { data }] = useMutation(createUserMutation);

    useEffect(() => {
        if (isAuthenticated && !isLoading && user) {
            const sendMutation = async () => {
                const token = await getAccessTokenSilently();

                if (user) {
                    createUser({
                        variables: {
                            id: user.sub,
                            email: user.email,
                            name: user.name,
                            nickname: user.nickname,
                            picture: user.picture,
                        },
                        context: {
                            headers: {
                                "authorization": `Bearer ${token}`
                            }
                        }
                    })
                }
            }
            
            sendMutation();
        }
    }, [isAuthenticated, createUser, isLoading, getAccessTokenSilently, user]);

    useEffect(() => {
        if (data) {
            dispatch(setTeam(data.createUser.team));
        }
    }, [data, dispatch]);

    if (!isAuthenticated) return <Login />;

    if (teamSelector.team) return <DashboardWithTeam />;

    if (teamSelector.team === null) return <DashboardWithoutTeam />;

    return <p>loading</p>
};

export default Dashboard;