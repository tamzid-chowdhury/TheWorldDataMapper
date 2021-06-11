# The World Data Mapper

With the ongoing COVID-19 global pandemic, the ability to organize data hierarchically in a robust and efficient manner is crucial now more than ever. Simply google searching "New York Covid-19 Cases" will display a table of statistics for cases, deaths, and recoveries, for each county in New York. Moreover substituting "New York" in that search with any region will display a list of subregions with hierarchically organized COVID-19 data. 

The WorldDataMapper is a CRUD based Web Application for managing regional data that is organized hierarchically. Users of this web application will be able to store, delete, and update regions by name, capital, leader, and landmarks. A region may contain multiple subregions that have their own data. Ultamately, what this allows us to do is create a root region (ex. The Earth) and organize our data by dividing our root regions into smaller subregions that flow logically (ex. The Earth -> Continents -> Countries -> Cities). 

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
- View Previous and Next Subling Regions
- Navigate back to Region Spreadsheet 
- Navigate between Subregion Fields 


## Tech

The application was developed using the MERN Stack plus a couple other technologies: 

- [MongoDB Atlas] - cross-platform document-oriented database program to store data 
- [Express] - designed for building web applications and APIs
- [Node.js] - open-source, cross-platform, back-end JavaScript runtime environment 
- [React] - front end library for modern web apps
- [GraphQL] - data query and manipulation language for API
- [Apollo] - open source GraphQL Server
- [Wolfie2D] - front-end templating library 



## Installation
```sh
run npm install on root directory
cd client
run npm install on client directory
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
![Imgur Image](https://i.imgur.com/iK97uuc.png)

### Region Viewer Page
![Imgur Image](https://i.imgur.com/4sEl1Rk.png)

