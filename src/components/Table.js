import "./Table.css";
import React, { useState } from "react";

const Table = ({
  sortedPlanets,
  tableHeadings,
  sort,
  setPage,
  handlePreviousPageClick,
  page,
}) => {
  const CaptilizeString = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  const handleNextClick = () => {
    setPage();
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            {tableHeadings.map((name, index) => (
              <th key={index} onClick={() => sort(name)}>
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedPlanets.map((planet, index) => (
            <tr key={index}>
              <td> {planet.name}</td>
              <td>
                {" "}
                {parseInt(planet.population).toLocaleString() === "NaN"
                  ? "??"
                  : parseInt(planet.population).toLocaleString()}
              </td>
              <td> {planet.rotation_period}</td>
              <td>
                {" "}
                {parseInt(planet.orbital_period).toLocaleString() === "NaN"
                  ? "??"
                  : parseInt(planet.orbital_period).toLocaleString()}
              </td>
              <td>
                {" "}
                {parseInt(planet.diameter).toLocaleString() === "NaN"
                  ? "??"
                  : parseInt(planet.diameter).toLocaleString()}
              </td>
              <td> {CaptilizeString(planet.climate)}</td>
              <td>
                {" "}
                {planet.surface_water === "unknown"
                  ? "??"
                  : planet.surface_water}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {page === 1 ? (
        ""
      ) : (
        <button onClick={handlePreviousPageClick}>Previous</button>
      )}
      {page >= 6 ? "" : <button onClick={handleNextClick}>Next</button>}

    </>
  );
};

export default Table;
