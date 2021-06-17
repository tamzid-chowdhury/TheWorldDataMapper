# The World Data Mapper

In todays fast-paced society the ability to organize data hierarchically in a robust and efficient manner is crucial. We can see this with the on going COVID-19 pandemic. If you Google search "New York Covid-19 Cases", you will be given a table displaying the number of cases, deaths, and recoveries in New York as well as the same data for each county in New York. We can substitute "New York" with any <b>region</b> and we will get data for that <b>region</b> as well as all its <b>subregions</b>.

The World Data Mapper is a CRUD based Web Application for managing regional data that is organized hierarchically. Users of this web application will be able to store, delete, and update regions by name, capital, leader, and landmarks. A region may contain multiple subregions that have their own data. Ultamately, what this allows us to do is create a root map (ex. The Earth) and organize our data by dividing our map into subregions that flow logically (ex. The Earth -> Continents -> Countries -> Cities). 

## Features

- Create, Login, and Update Account 
- Create, Edit, Delete, and Select Root Map File
- Navigate to Region Spreadsheet
- Add, Edit, and Delete Subregions 
- Sort Table of Subregions 
- Undo and Redo 
- Navigate between Ancestor Regions 
- Navigate to Region Viewer 
- Create, Edit, and Delete Region Landmarks 
- Change Parent Region
- View Previous and Next Sibling Regions
- Navigate back to Region Spreadsheet 
- Navigate between Subregion Fields 


## Tech

The application was developed using the MERN Stack along with a few other technologies: 

- [MongoDB] - cross-platform document-oriented database program to store data 
- [Express] - designed for building web applications and APIs
- [React] - front end library for modern reactive web apps
- [Node.js] - cross-platform back-end JavaScript runtime environment 
- [GraphQL] - data query and manipulation language for API
- [Apollo] - open source GraphQL Server
- [Wolfie2D] - front-end templating library designed by students at Stony Brook University



## Installation

Begin by cloning this repository. Move into the root directory. 
```sh
gh repo clone tamzid-chowdhury/TheWorldDataMapper
cd TheWorldDataMapper
```
Install dependencies in both the root directory and the client directory. Then in the root directory run the servers. 
```sh
npm install
cd client
npm install
cd ..
npm start
```


### Welcome Page
![Imgur Image](https://i.imgur.com/VSPkpaC.png)

### Create Acount Page
![Imgur Image](https://imgur.com/qqIw6QN.png)


### Mapscreen Page
![Imgur Image](https://i.imgur.com/Gq9OJgp.png)


### Region Spreadsheet Page
![Imgur Image](https://i.imgur.com/mRCRLaz.png)

### Region Viewer Page
![Imgur Image](https://i.imgur.com/4sEl1Rk.png)

