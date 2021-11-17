import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector } from '../app/hooks';

import { selectTeam } from "../features/team/teamSlice";

import Login from '../components/organisms/Login';
import DashboardWithoutTeam from "../components/organisms/DashboardWithoutTeam";
import DashboardWithTeam from "../components/organisms/DashboardWithTeam";

const Dashboard = () => {
    const teamSelector = useAppSelector(selectTeam)
    const { isAuthenticated } = useAuth0();

    if (!isAuthenticated) return <Login />;

    if (teamSelector.team === undefined) return <DashboardWithoutTeam />;

    if (teamSelector) return <DashboardWithTeam />;

    return <p>loading</p>
};

export default Dashboard;