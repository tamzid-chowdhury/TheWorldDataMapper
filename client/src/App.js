import React 			from 'react';
import Homescreen 		from './components/homescreen/homescreen';
import Mapscreen 		from './components/mapscreen/mapscreen';
import { useQuery } 	from '@apollo/client';
import * as queries 	from './cache/queries';
import { jsTPS } 		from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

 
const App = () => {
	let user = null;
	let username = null; 
    let transactionStack = new jsTPS();
	
    const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);

    if(error) { console.log(error); }
	if(loading) { return <div></div> }
	if(data) { 
		let { getCurrentUser } = data;
		if(getCurrentUser !== null) { 
			user = getCurrentUser; 
			username  = getCurrentUser.name; 
		}
	}


	return(
		<BrowserRouter>				
			<Switch>

				<Redirect exact from="/" to={ {pathname: "/homescreen"} } /> 

				<Route exact path="/homescreen">
					<Homescreen fetchUser={refetch}/> 
				</Route>

				<Route path="/mapscreen">
					<Mapscreen tps={transactionStack} user={user} username={username} fetchUser={refetch}/> 
				</Route>
				
				
			

			</Switch>	

		</BrowserRouter>
	);
}

export default App;