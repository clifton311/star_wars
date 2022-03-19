import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ planetsInfo }) => {

  console.log(planetsInfo)
  const grabPlanetsPopulation = (planetsInfo) => {
    let population = []
    planetsInfo.map((result) => {
      population.push(result.population)
     
    });

    return population
  };

  console.log(grabPlanetsPopulation(planetsInfo));

  const grabPopulation = (planetsInfo) => {
  
    planetsInfo.map((planet) => {
      return planet.population;
    });
  };

  const grabRotationPeriod = (planetsInfo) => {
    let populationArray = [];
    planetsInfo.map((planet) => {
     return planet.rotatio_period
    });

    return populationArray;
  };

  const data = {
    labels: planetsInfo.map(planet => planet.name),
    datasets: [
      {
        label: "Population of Planets",
        data: grabPlanetsPopulation(planetsInfo) ,
        backgroundColor: "yellow",
        borderColor: "black",
      },
      {
        label: "Orbital Period",
        data:  planetsInfo.map(planet => planet.orbital_period),
        backgroundColor: "black",
        borderColor: "black",
      },
      {
        label: "Rotation Period",
        data:  planetsInfo.map(planet => planet.rotation_period),
        backgroundColor: "green",
        borderColor: "black",
      },
      {
        label: "Surface Water",
        data:  planetsInfo.map(planet => planet.surface_water),
        backgroundColor: "blue",
        borderColor: "black",
      },
    ],
  };

  const options = {
    responsive: true,
    scaleShowValues: true,
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: true
        }
      }]
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Population",
      },
    },
  };
  return (
    <div style={{ width: "1200px" }}>
      <Bar options={options} data={data} />;
    </div>
  );
};

export default Chart;
