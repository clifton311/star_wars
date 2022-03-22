import "./Table2.css";
import React from "react";


const Table2 = ({ sortedPlanets, tableHeadings, sort }) => {
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
    </>
  );
};

export default Table2;
