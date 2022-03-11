import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "./components/Table";
import { Bar } from 'react-chartjs-2';
import Chart from './components/Chart'



const tableHeadings = [
  "Name",
  "Population",
  "Rotation Period",
  "Orbital Period",
  "Diameter",
  "Climate",
  "Surface Water",
];

function App() {
  const [planetsInfo, setPlanetsInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  const baseUrl = `https://swapi.dev/api`;

  const getPlanets = async () => {
    try {
      setLoading(true);
      const planets = [];
      for (let i = 1; i <= 6; i++) {
        await axios.get(`${baseUrl}/planets/?page=${i}`).then((response) => {
          planets.push(response.data);
        });
      }

      Promise.all(planets).then((data) => {
        setPlanetsInfo(data);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPlanets();
  }, []);


  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <h2>Star Wars Planets</h2>
      <>
        <Chart planetsInfo={planetsInfo}/>

        <br></br>
        <h1>Table of Planets</h1>
        <Table planetsInfo={planetsInfo} tableHeadings={tableHeadings} />
      </>
      
    </div>
  );
}

export default App;
