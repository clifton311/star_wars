import "./Table.css";
import React, {  useState } from "react";

const Table = ({ planetsInfo, tableHeadings }) => {



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

 const CapitlizeString = (str) => {
   return str[0].toUpperCase() + str.slice(1)
 }

  //sorted the planets by name
 let sorted = results.sort((a, b) => a.name > b.name ? 1 : -1)
 

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
          {sorted.map((planet, index) => (
            <tr key={index}>
              <td> {planet.name}</td>
              <td> {parseInt(planet.population).toLocaleString() === 'NaN' ? "??" : parseInt(planet.population).toLocaleString() }</td>
              <td> {planet.rotation_period}</td>
              <td> {planet.orbital_period}</td>
              <td> {parseInt(planet.diameter).toLocaleString() === 'NaN' ? "??" : parseInt(planet.diameter).toLocaleString() }</td>
              <td> {CapitlizeString(planet.climate)}</td>
              <td> {planet.surface_water === 'unknown' ? '??' : planet.surface_water }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
