import React 			from 'react';
import Homescreen 		from './components/homescreen/homescreen';
import Mapscreen 		from './components/mapscreen/mapscreen';
import { useQuery } 	from '@apollo/client';
import * as queries 	from './cache/queries';
import { jsTPS } 		from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Regionscreen from './components/region/regionscreen';
import Landmarkscreen from './components/region/landmarkscreen';
 
const App = (props) => {
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
			{
				user === null ? 
				<Redirect exact from="/" to={ {pathname: "/homescreen"} } /> :
				<Redirect exact from="/" to={ {pathname: "/mapscreen/" + user._id} } /> 
			}
				<Route exact path="/homescreen">
					<Homescreen fetchUser={refetch} user={user}/> 
				</Route>

				<Route path="/mapscreen/:id">
					<Mapscreen user={user} username={username} fetchUser={refetch}/> 
				</Route>
				
				<Route path="/regionscreen/:id">
					<Regionscreen tps={transactionStack} user={user} username={username} fetchUser={refetch} images={props.images}/> 
				</Route>
				
				<Route path="/landmarkscreen/:id">
					<Landmarkscreen tps={transactionStack} user={user} username={username} fetchUser={refetch} images={props.images}/>
				</Route>
			

			</Switch>	

		</BrowserRouter>
	);
}

export default App;