import "./App.css";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Table from "./components/Table";
import Table2 from "./components/Table2";
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
const baseUrl = `https://swapi.dev/api/planets`;

function App() {
  const headerRef = useRef();

  const [planetsInfo, setPlanetsInfo] = useState([]);
  const [planets, setPlanets] = useState([]);
  
  const [order, setOrder] = useState("ASC");

  const [pageNumber, setPageNumber] = useState(1);
  const [nextPage, setNextPage] = useState(1);
  
  const [page, setPage] = useState(1);
  const [grabbedAllPlanets, setGrabbedAllPlanets] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPlanets = async () => {
    const all = [];
    if (!grabbedAllPlanets && !error) {
      await axios
        .get(`https://swapi.dev/api/planets/?page=${page}`)
        .then((res) => {
          if (res.status === 404) {
            setGrabbedAllPlanets(true);
            setError(true);
          } else {
            const response = res.data.results;

            setPlanetsInfo(planetsInfo.concat(response));
            setPage(page + 1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getTenPlanets = async () => {
    try {
      setLoading(true);
      const planets = await axios.get(`${baseUrl}/?page=${nextPage}`);

      setPlanets(planets.data.results);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  //////Code for Pagination ///////
  const itemsPerPage = 10;
  const pagesVisted = pageNumber * itemsPerPage;
  const displayPlanets = planetsInfo
    .flat()
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .slice(pagesVisted, pagesVisted + itemsPerPage);

  const pageCount = Math.ceil(planetsInfo.flat().length / itemsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleNextPageClick = () => {
    if (nextPage > pageCount) return;
    setNextPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPageClick = () => {
    if (nextPage < 1) return;
    setNextPage((prevPage) => prevPage - 1);
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
    let sorted = planetsInfo.sort((a, b) => (a.name > b.name ? 1 : -1));

    return sorted;
  };

  useEffect(() => {
    // function to grab ten planets per page
    getTenPlanets();
    const autoScroll = () => {
      headerRef.current.scrollIntoView({ behavior: "smooth" });
    };
    autoScroll();
  }, [nextPage]);

  useEffect(() => {
    getPlanets();
  }, [page]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <h1>Star Wars Planets</h1>
      <>
        <h2 ref={headerRef}>Table of Planets</h2>
        <Table
          sortedPlanets={sortPlanetsByName(planets)}
          tableHeadings={tableHeadings}
          sort={sort}
          handleNextPageClick={handleNextPageClick}
          handlePreviousPageClick={handlePreviousPageClick}
          nextPage={nextPage}
        />
        <h2>Table of Planets with Pagination </h2>
        <Table2
          sortedPlanets={sortPlanetsByName(displayPlanets)}
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
        <div className="chart">
          <h2>Planets Chart</h2>
          <Chart planetsInfo={sortPlanetsByName(planetsInfo)} />
          <br></br>
        </div>
      </>
    </div>
  );
}

export default App;
