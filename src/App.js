import "./App.css";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Table from "./components/Table";
import { Bar } from "react-chartjs-2";
import Chart from "./components/Chart";

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
  const headerRef = useRef();
  const [planetsInfo, setPlanetsInfo] = useState([]);

  const [planets, setPlanets] = useState([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [order, setOrder] = useState("ASC");

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

  const getTenPlanets = async () => {
    try {
      setLoading(true);
      await axios.get(`${baseUrl}/planets/?page=${page}`).then((response) => {
        let results = response.data.results;
        setPlanets(results);
      });

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNextPageClick = () => {
    if (page > 6) return;
    setPage(page + 1);
  };

  const handlePreviousPageClick = () => {
    if (page < 1) return;
    setPage(page - 1);
  };

  const sort = (col) => {
    if (order === "ASC") {
      const sorted = [
        ...planetsInfo.map((info) => {
          info.results.sort((a, b) => (a.name > b.name ? 1 : -1));
        }),
      ];
    }
  };

  const sortPlanetsByName = (planetsInfo) => {
    let results = [];

    planetsInfo.map((info) => {
      info.results
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((data) => {
          results.push(data);
        });
    });

    let sorted = results.sort((a, b) => (a.name > b.name ? 1 : -1));

    return sorted;
  };

  useEffect(() => {
    // getPlanets();
    getTenPlanets();

    const autoScroll = () => {
      headerRef.current.scrollIntoView({ behavior: "smooth" });
    };
    autoScroll();
  }, [page]);

  useEffect(() => {
    getPlanets();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <h2>Star Wars Planets</h2>
      <>
        <h1>Table of Planets</h1>
        <Table
          // sortedPlanets={sortPlanetsByName(planetsInfo)}
          sortedPlanets={planets}
          tableHeadings={tableHeadings}
          sort={sort}
          setPage={handleNextPageClick}
          handlePreviousPageClick={handlePreviousPageClick}
          page={page}
        />
        <h1 ref={headerRef}>Population Chart</h1>
        <Chart planetsInfo={planetsInfo} />
        <br></br>
      </>
    </div>
  );
}

export default App;
