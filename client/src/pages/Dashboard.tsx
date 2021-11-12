import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";

import Login from '../components/organisms/Login';
import DashboardWithoutTeam from "../components/organisms/DashboardWithoutTeam";
import DashboardWithTeam from "../components/organisms/DashboardWithTeam";

// This is used as well to check if user is in team
const createUserMutation = gql`
    mutation createUser($id: String!, $email: String!, $name: String!, $nickname: String!, $picture: String!) {
        createUser(id: $id, email: $email, name: $name, nickname: $nickname, picture: $picture) {
            team
        }
    }
`

const Dashboard = () => {
    const { isAuthenticated, isLoading, getAccessTokenSilently, user } = useAuth0();
    const [ hasTeam, setHasTeam ] = useState<boolean | null>(null);
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
            setHasTeam(data.createUser.team);
        }
    }, [data]);

    if (!isAuthenticated) return <Login />;

    if (hasTeam === true) return <DashboardWithTeam />;

    if (hasTeam === false) return <DashboardWithoutTeam />;

    return <p>loading</p>
};

export default Dashboard;