import './App.css';
import { useAuth0 } from "@auth0/auth0-react";
import { gql, useQuery } from "@apollo/client";

const testQuery = gql`
	query Query {
		hello
	}
`

function App() {
	const { loginWithRedirect } = useAuth0();
	const { data } = useQuery(testQuery);

	console.log(data);

	return (
		<div className="App">
			<button onClick={() => loginWithRedirect()}>Log In </button>
		</div>
  	);
}

export default App;
