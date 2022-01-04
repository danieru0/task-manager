import { useEffect } from 'react';
import { Routes, Route, useLocation, matchPath, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth0 } from "@auth0/auth0-react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useAppDispatch } from './app/hooks';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThLarge, faProjectDiagram, faCaretRight, faFileCode, faSignOutAlt, faCommentDots, faCog, faTimes, faComment } from '@fortawesome/free-solid-svg-icons'

import { useSocketContext } from './context/socketContext';

import { setTeam, addInviteRequest, moveTask, removeKanban,removeProject, MoveTaskInterface } from "./features/team/teamSlice";
import { setWorkingTasks, updateWorkingTaskStage } from './features/user/userSlice';

import Modal from './components/organisms/Modal';
import Nav from './components/organisms/Nav';
import ContextMenu from './components/organisms/ContextMenu';

import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import Join from './pages/Join';
import ManageProjects from './pages/ManageProjects';
import Users from './pages/ManageUsers';
import KickPage from './pages/KickPage';

library.add(faThLarge, faProjectDiagram, faCaretRight, faFileCode, faSignOutAlt, faCommentDots, faCog, faTimes, faComment);

const getUserTeamQuery = gql`
	query getUserTeam {
		getUserTeam {
			id
			name
			inviteLink
			projects {
				id
				name
				tasksCounter
				kanbans {
					id
					name
					tasks {
						id
						name
						author {
							nickname
							picture
						}
						description
						tag
						workingUsers {
							nickname
							picture
						}
						comments {
							id
							author {
								picture
								nickname
							}
							text
						}
					}
				}
			}
			users {
				id
				name
				nickname
				email
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

const createUserMutation = gql`
    mutation createUser($id: String!, $email: String!, $name: String!, $nickname: String!, $picture: String!) {
        createUser(id: $id, email: $email, name: $name, nickname: $nickname, picture: $picture)
    }
`

const getUserWorkingTasksQuery = gql`
	query getUserWorkingTasks {
		getUserWorkingTasks {
			id
			name
			stage
			projectName
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
	const socket = useSocketContext();
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
	const [ getTeam, { data: teamData, loading } ] = useLazyQuery(getUserTeamQuery);
	const [ createUser, { data: userData }] = useMutation(createUserMutation);
	const [ getUserWorkingTasks, { data: workingTasks } ] = useLazyQuery(getUserWorkingTasksQuery);

	useEffect(() => {
		if (isAuthenticated && userData) {
			getTeam()
		}
	}, [isAuthenticated, getTeam, socket, userData]);

	useEffect(() => {
		if (isAuthenticated && user) {
			const initUserInDatabase = async () => {
				const token = await getAccessTokenSilently();

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

			initUserInDatabase();
		}
	}, [isAuthenticated, user, createUser, getAccessTokenSilently]);

	useEffect(() => {
		if (teamData) {
			dispatch(setTeam(teamData.getUserTeam));

			getUserWorkingTasks();
		}
	}, [teamData, getUserWorkingTasks, dispatch]);

	useEffect(() => {
		if (workingTasks) {
			dispatch(setWorkingTasks(workingTasks.getUserWorkingTasks))
		}
	}, [workingTasks, dispatch])

	useEffect(() => {
		if (socket) {
			socket.on('sendRejectTeamRequestSocket', () => {
				alert('Your request was rejected!');
			});

			socket.on('sendJoinTeamRequestSocket', userData => {
				dispatch(addInviteRequest(userData));
			});

			socket.on('sendAcceptTeamRequestSocket', () => {
				getTeam();
			});

			socket.on('sendMoveTaskSocket', (socketData: MoveTaskInterface) => {
				dispatch(moveTask(socketData));
				dispatch(updateWorkingTaskStage({
					taskId: socketData.task.id,
					stage: socketData.task.stage
				}))
			});
			
			socket.on('sendDeleteKanbanSocket', ({kanbanId, projectId}) => {
				dispatch(removeKanban({
					kanbanId,
					projectId
				}));
				
				const currentUrl = matchPath('/project/:id/:kanbanId/:taskId', pathname)
				if (currentUrl && currentUrl.params.kanbanId === kanbanId) navigate('/');
			})

			socket.on('sendDeleteProjectSocket', projectId => {
				dispatch(removeProject(projectId));

				const currentUrl = matchPath('/project/:id', pathname)
				if (currentUrl && currentUrl.params.id === projectId) navigate('/');
			})

			socket.on('sendKickFromTeamSocket', () => {
				dispatch(setTeam(null));

				navigate('/kicked');
			})
		}

		return () => {
			if (socket) {
				socket.off('sendRejectTeamRequestSocket');
				socket.off('sendJoinTeamRequestSocket');
				socket.off('sendAcceptTeamRequestSocket');
				socket.off('sendMoveTaskSocket');
				socket.off('sendDeleteKanbanSocket');
				socket.off('sendDeleteProjectSocket');
				socket.off('sendDeleteKickSocket');
			}
		}
	}, [socket, dispatch, getTeam, pathname, navigate]);

	if (loading && userData) return <span>loading</span>

	return (
		<Container>
			<Modal />
			<ContextMenu />
			<Nav />
			<Wrapper>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/join/:id" element={<Join />} />
					<Route path="/project/:id/:kanbanId/:taskId" element={<Project />} />
					<Route path="/project/:id" element={<Project />} />
					<Route path="/manage-projects/:id" element={<ManageProjects />} />
					<Route path="/manage-projects" element={<ManageProjects />} />
					<Route path="/manage-users" element={<Users />} />
					<Route path="/messages" element={<Messages />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/kicked" element={<KickPage />} />
				</Routes>
			</Wrapper>
		</Container>
  	);
}

export default App;
