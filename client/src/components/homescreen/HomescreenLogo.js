import React from 'react';
import redGlobe from '../../assets/redglobe.jpg';
import worldMap from '../../assets/worldmapper.jpg';

const HomescreenLogo = (props) => {
	return(
		<div>
			<img src={redGlobe} width="700" height="650"></img>
			<p>Welcome to The World Data Mapper</p> 
		</div>
	);
};

export default HomescreenLogo;

