import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThLarge, faProjectDiagram, faCaretRight, faFileCode, faSignOutAlt, faCommentDots, faCog } from '@fortawesome/free-solid-svg-icons'

import Nav from './components/organisms/Nav';

import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import Join from './pages/Join';

library.add(faThLarge, faProjectDiagram, faCaretRight, faFileCode, faSignOutAlt, faCommentDots, faCog);

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
