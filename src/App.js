import "./App.css";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Table from "./components/Table";
import Table2 from "./components/Table2";
import { Bar } from "react-chartjs-2";
import Chart from "./components/Chart";
import ReactPaginate from "react-paginate";

const tableHeadings = [
  "Name",
  "Population",
  "Rotation Period",
  "Orbital Period",
  "Diameter",
  "Climate",
  "Surface Water",
];
const baseUrl = `https://swapi.dev/api`;

function App() {
  const headerRef = useRef();

  const [planetsInfo, setPlanetsInfo] = useState([]);
  const [planets, setPlanets] = useState([]);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState("ASC");

  const [pageNumber, setPageNumber] = useState(1);

  const getPlanets = async () => {
    try {
      setLoading(true);
      const planets = [];
      for (let i = 1; i <= 6; i++) {
        await axios.get(`${baseUrl}/planets/?page=${i}`).then((response) => {
          planets.push(response.data.results);
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
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPageClick = () => {
    if (page < 1) return;
    setPage((prevPage) => prevPage - 1);
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
      info
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((data) => {
          results.push(data);
        });
    });
    let sorted = results.sort((a, b) => (a.name > b.name ? 1 : -1));

    return sorted;
  };

  const sortPlanetsByName2 = (planetsInfo) => {
    let sorted = planetsInfo.sort((a, b) => (a.name > b.name ? 1 : -1));
    return sorted;
  };

  useEffect(() => {
    getTenPlanets();
    const autoScroll = () => {
      headerRef.current.scrollIntoView({ behavior: "smooth" });
    };
    autoScroll();
  }, [page]);

  useEffect(() => {
    getPlanets();
  }, []);

  console.log(planetsInfo);

  const itemsPerPage = 10;
  const pagesVisted = pageNumber * itemsPerPage;

  const displayPlanets = planetsInfo
    .flat()
    .slice(pagesVisted, pagesVisted + itemsPerPage);

  console.log("displayPlanets", displayPlanets);

  const pageCount = Math.ceil(planetsInfo.flat().length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <h2>Star Wars Planets</h2>
      <>
        <h1 ref={headerRef}>Table of Planets</h1>
        <Table
          // sortedPlanets={sortPlanetsByName(planetsInfo)}
          sortedPlanets={sortPlanetsByName2(planets)}
          tableHeadings={tableHeadings}
          sort={sort}
          handleNextPageClick={handleNextPageClick}
          handlePreviousPageClick={handlePreviousPageClick}
          page={page}
        />

        <Table2
          sortedPlanets={sortPlanetsByName2(displayPlanets)}
          tableHeadings={tableHeadings}
          sort={sort}
        />
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttns"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
        <h1>Population Chart</h1>
        <Chart planetsInfo={planetsInfo} />
        <br></br>
      </>
    </div>
  );
}

export default App;
