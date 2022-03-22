import "./Table.css";
import React, { useState } from "react";

const Table = ({
  sortedPlanets,
  tableHeadings,
  sort,
  handleNextPageClick,
  handlePreviousPageClick,
  nextPage,
}) => {
  const CaptilizeString = (str) => {
    return str[0].toUpperCase() + str.slice(1);
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
                  ? "Unknown"
                  : parseInt(planet.population).toLocaleString()}
              </td>
              <td> {planet.rotation_period}</td>
              <td>
                {" "}
                {parseInt(planet.orbital_period).toLocaleString() === "NaN"
                  ? "Unknown"
                  : parseInt(planet.orbital_period).toLocaleString()}
              </td>
              <td>
                {" "}
                {parseInt(planet.diameter).toLocaleString() === "NaN"
                  ? "Unknown"
                  : parseInt(planet.diameter).toLocaleString()}
              </td>
              <td> {CaptilizeString(planet.climate)}</td>
              <td>
                {" "}
                {planet.surface_water === "unknown"
                  ? "Unknown"
                  : planet.surface_water}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {nextPage === 1  ? (
        ""
      ) : (
        <button onClick={handlePreviousPageClick}>Previous Page</button>
      )}
      {nextPage >= 6  ? "" : <button onClick={handleNextPageClick}>Next Page</button>}

    </>
  );
};

export default Table;
