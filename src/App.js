import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "./components/Table";

function App() {
  const [planetsInfo, setPlanetsInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  const baseUrl = `https://swapi.dev/api/`;

  const getPlanets = async () => {
    try {
      await axios.get(`${baseUrl}planets/?page=${3}`).then((response) => {
     
        setPlanetsInfo(response.data.results);
      });
    } catch (err) {}
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const tableHeadings = [
   'Name', 'Population', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate', 'Surface Water'
  ]

  return (
    <div className="App">
      <h2>Star Wars Planets</h2>
    
            <>
              <Table
                planetsInfo={planetsInfo}
                tableHeadings={tableHeadings}
              />
            </>
       
    </div>
  );
}

export default App;
