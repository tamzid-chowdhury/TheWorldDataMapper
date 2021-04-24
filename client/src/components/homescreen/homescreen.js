import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import {WNavbar,WNavItem} 	from 'wt-frontend';
import {WLayout, WLHeader, WLMain} from 'wt-frontend';
import {WRpw, WColumn} from 'wt-frontend';
import Logo from '../navbar/Logo'
import WRow from 'wt-frontend/build/components/wgrid/WRow';
import WCol from 'wt-frontend/build/components/wgrid/WCol';
import redGlobe from '../../assets/redglobe.jpg';

const Homescreen = (props) => {
    return(
		<WLayout WLayout="header"> 


			<WLHeader color="colored">
				<WNavbar className="navbar">
					<WRow>
						<WCol size="1.5">
							<Logo /> 
						</WCol> 
					</WRow>
				</WNavbar>
			</WLHeader>

			<WLMain>
				<div className="homescreenLogo">
					<HomescreenLogo/>
				</div>
			</WLMain>

			
		</WLayout>
	);

}

const HomescreenLogo = (props) => {
	return(
		<div>
			<img src={redGlobe} alt="Red Globe" width="650" height="650"></img>
			<p>Welcome to The World Data Mapper</p> 
		</div>
	);
};

export default Homescreen;

