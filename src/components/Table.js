import "./Table.css";
const Table = ({ planetsInfo, tableHeadings }) => {


  //sorted the planets by name
 let sorted = planetsInfo.sort((a, b) => a.name > b.name ? 1 : -1)
 console.log(sorted)

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
