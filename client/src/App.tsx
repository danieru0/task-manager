import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth0 } from "@auth0/auth0-react";
import { gql, useLazyQuery } from "@apollo/client";
import { useAppDispatch } from './app/hooks';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThLarge, faProjectDiagram, faCaretRight, faFileCode, faSignOutAlt, faCommentDots, faCog } from '@fortawesome/free-solid-svg-icons'

import { useSocketContext } from './context/socketContext';

import { setTeam, addInviteRequest } from "./features/team/teamSlice";

import Nav from './components/organisms/Nav';

import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import Join from './pages/Join';

library.add(faThLarge, faProjectDiagram, faCaretRight, faFileCode, faSignOutAlt, faCommentDots, faCog);

const getUserTeamQuery = gql`
	query getUserTeam {
		getUserTeam {
			id
			name
			inviteLink
			projects {
				name
			}
			users {
				name
			}
			inviteRequests {
				id
				picture
				email
				nickname
			}
		}
	}

`

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	font-family: ${({theme}) => theme.font};
`

const Wrapper = styled.div`
	margin-left: 280px;
	width: calc(100% - 280px);
`

function App() {
	const dispatch = useAppDispatch();
	const { isAuthenticated } = useAuth0();
	const socket = useSocketContext();
	const [ getTeam, { data, loading } ] = useLazyQuery(getUserTeamQuery);

	useEffect(() => {
		if (isAuthenticated) {
			getTeam()
		}
	}, [isAuthenticated, getTeam, socket]);

	useEffect(() => {
		if (data) {
			dispatch(setTeam(data.getUserTeam));
		}
	}, [data, dispatch]);

	useEffect(() => {
		if (socket) {
			socket.on('sendRejectTeamRequestSocket', () => {
				alert('Your request was rejected!');
			});

			socket.on('sendJoinTeamRequestSocket', userData => {
				dispatch(addInviteRequest(userData));
			})

			socket.on('sendAcceptTeamRequestSocket', () => {
				getTeam();
			})
		}

		return () => {
			if (socket) {
				socket.off('sendRejectTeamRequestSocket');
				socket.off('sendJoinTeamRequestSocket');
				socket.off('sendAcceptTeamRequestSocket');
			}
		}
	}, [socket, dispatch, getTeam]);

	if (loading) return <span>loading</span>

	return (
		<Container>
			<Nav />
			<Wrapper>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/join/:id" element={<Join />} />
					<Route path="/project/:id" element={<Project />} />
					<Route path="/messages" element={<Messages />} />
					<Route path="/settings" element={<Settings />} />
				</Routes>
			</Wrapper>
		</Container>
  	);
}

export default App;
