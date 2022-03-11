import "./Table.css";
import React, { useEffect, useState } from "react";

const Table = ({ planetsInfo, tableHeadings }) => {

  console.log(planetsInfo)

  let results = []

  const [sortOrder, setSortOrder] = useState();
  // let arr = planetsInfo.map((info) => {
  //   console.log(info)
  // }

 planetsInfo.map(info => {
   info.results.sort((a, b) => a.name > b.name ? 1 : -1).map(data => {
  
    results.push(data)
   })
 })

  //sorted the planets by name
 let sorted = results.sort((a, b) => a.name > b.name ? 1 : -1)
 console.log(sorted.length)

  return (
    <>
      <table >
        <thead >
          <tr>
            {tableHeadings.map((name, index) => (
              <th key={index}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((planet) => (
            <tr>
              <td> {planet.name}</td>
              <td> {planet.population.toLocaleString()}</td>
              <td> {planet.rotation_period}</td>
              <td> {planet.orbital_period}</td>
              <td> {planet.diameter}</td>
              <td> {planet.climate}</td>
              <td> {planet.surface_water === 'unknown' ? '??' : planet.surface_water }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
