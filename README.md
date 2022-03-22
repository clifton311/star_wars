
# Overview

Take Home Coding Assessement for candidate **Clifton Ho**.

Application was built with Create React App.


To start the application:
1. `npm install`
2. `npm start`

When you start the web page, you will see two tables of Star Wars Planets and a bar chart showing the population of each planet with option to click different attributes. This was graphed using React Chart.JS

The first table is a table that paginates based on the Swapi planets endpoint Everytime you click the `Next Page` button, it will retrieve the next ten planets. Pagination for the table (show 10 planets each page)

The second table is pagination for a table of the Star Wars planes when all the planets were fetched by the API. 

I did pagination both ways to show case both ways. Both tables are ordered alphabetically by the planet's name. 

Additional Features I would have added:

Able to sort columns in order by clicking.

____________________________________________________________


# Directions
There is a free API online that provides endpoints to fetch data about Starwars. Some of this data includes the people of Starwars, the spaceships, and the planets.

The API can be accessed here: SWAPI. On this site, you can run requests to see how the data is returned.

For this assignment, we will only be focusing on planets. There a total of 60 planets in the Starwars universe.

The only API endpoint that you will need to work with will be the planets endpoint (https://swapi.dev/api/planets/)

HINT: The endpoint provided only fetches 10 planets, but there are 60 total. You will need to find a way to retrieve all 60. Pay attention closely to the data that is returned from the endpoint call.

Requirements
What we would like you to do is to create a React web page that displays a bar chart and a table of the planet's attributes.

The bar chart should only show the population of each planet.

The X Axis will be the planet's name. The Y Axis will be the planet's population.

The table should show the following attributes of each planet:

Name
Population
Rotation Period
Orbital Period
Diameter
Climate
Surface Water

The table and bar chart should be ordered alphabetically by the planet's name.

Here are some optional (nice-to-have) features:

Pagination for the table (show 10 planets each page)
Ability to choose to graph different attributes on the bar chart (rotation period, orbital period, etc)
You will need to use a graphing library to display the bar chart. There are many graphing libraries in JavaScript to choose from.

Here are some suggestions, but feel free to use whatever you want:

Plotly
Chart.js
Both Plotly & Chart.js have React wrapper libraries that you can use.

Deliverables
Please commit your code to a GitHub repository and share the link to lee.derek@gene.com when completed
Please verify that your code successfully loads before submitting
You can start up the project with create-react-app (recommended).
It is recommended that you write your components using React hooks.
You are free to use any other libraries that you think may be needed for this project. All packages should be listed in the package.json for the project
You can design the web page to any layout that you want.
You can use any version of React.