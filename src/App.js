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
const baseUrl = `https://swapi.dev/api/planets`;

function App() {
  const headerRef = useRef();
  const [planetsInfo, setPlanetsInfo] = useState([]);

  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);

  const [order, setOrder] = useState("ASC");
  const [pageNumber, setPageNumber] = useState(1);

  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);
  const [grabPlanets, setGrabPlanets] = useState(false);
  const [error, setError] = useState(null);

  // const requestData = () =>
  //   fetch(`https://swapi.dev/api/planets/?page=${page}`).then((res) => {
  //     if (res.ok) {
  //       let response = res.json();
  //       console.log(response);
  //       setPlanetsInfo(planetsInfo.concat(response.results));
  //       setPage(page + 1);
  //     } else if (res.status === 404) {
  //       setGotEveryone(true);
  //     } else {
  //       setError(res.status);
  //       return Promise.reject("some other error: " + res.status);
  //     }
  //   });

  const getPlanets = async () => {
    if (!grabPlanets && !error) {
      await axios
        .get(`https://swapi.dev/api/planets/?page=${page}`)
        .then((res) => {
          if (res.status === 404) {
            setGrabPlanets(true);
            setError(true);
          } else {
            const response =  res.data.results
              setPlanetsInfo(planetsInfo.concat(response));
              setPage(page + 1);
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // Promise.all(planets).then((data) => {
    //   let sortedData = data.flat().sort((a, b) => (a.name > b.name ? 1 : -1));
    //   setPlanetsInfo(sortedData);
    //   setLoading(false);
    // });
  };



  const getTenPlanets = async () => {
    try {
      setLoading(true);
      const planets = await fetch(`${baseUrl}/?page=${nextPage}`);
      const json = await planets.json();

      setPlanets(json.results);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNextPageClick = () => {
    if (nextPage > 6) return;
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
    getTenPlanets();
    const autoScroll = () => {
      headerRef.current.scrollIntoView({ behavior: "smooth" });
    };
    autoScroll();
  }, [nextPage]);

  useEffect(() => {
    getPlanets();
  }, [page]);

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

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <h2>Star Wars Planets</h2>
      <>
        <h1 ref={headerRef}>Table of Planets</h1>
        <Table
          // sortedPlanets={sortPlanetsByName(planetsInfo)}
          sortedPlanets={sortPlanetsByName(planets)}
          tableHeadings={tableHeadings}
          sort={sort}
          handleNextPageClick={handleNextPageClick}
          handlePreviousPageClick={handlePreviousPageClick}
          nextPage={nextPage}
        />
        <h1>Table of Planets with Pagination </h1>

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
          <h1>Planets Chart</h1>
          <Chart planetsInfo={sortPlanetsByName(planetsInfo)} />
          <br></br>
        </div>
      </>
    </div>
  );
}

export default App;
