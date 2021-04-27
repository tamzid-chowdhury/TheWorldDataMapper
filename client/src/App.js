import React 			from 'react';
import Homescreen 		from './components/homescreen/homescreen';
import Mapscreen 		from './components/mapscreen/mapscreen';
import { useQuery } 	from '@apollo/client';
import * as queries 	from './cache/queries';
import { jsTPS } 		from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
 
const App = () => {
	let user = null;
    let transactionStack = new jsTPS();
	
    const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);

    if(error) { console.log(error); }
	if(loading) { console.log(loading); }
	if(data) { 
		let { getCurrentUser } = data;
		if(getCurrentUser !== null) { user = getCurrentUser; }
	}


	return(
		<BrowserRouter>
			{
				user === null ? 
				<Redirect exact from="/" to={ {pathname: "/homescreen"} } /> :
				<Redirect exact from="/" to={ {pathname: "/mapscreen"} } /> 
			}
				

				<Route 
					exact path="/homescreen" 
					render={() => 
						<Homescreen fetchUser={refetch}/>
					} 
				/>

				<Route
					path="/mapscreen"
					render={() =>
						<Mapscreen tps={transactionStack} user={user} fetchUser={refetch}/> 
					}
				/>
		</BrowserRouter>
	);
}

export default App;