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


  const grabPlanets = (planetsInfo) => {
    let names = [];
    planetsInfo.map((info) => {
      info.results.sort((a, b) => a.name > b.name ? 1 : -1).map((result) => {
        names.push(result.name);
      });
    });

    return names
  };


  const grabPopulation = (planetsInfo) => {
    let populationArray = [];
    planetsInfo.map((info) => {
      info.results.sort((a, b) => a.name > b.name ? 1 : -1).map((result) => {
        populationArray.push(result.population);
      });
    });

    console.log(populationArray)

    return populationArray
  };

  const data = {
    labels: grabPlanets(planetsInfo),
    datasets: [
      {
        label: "Population of Planets",
        data: grabPopulation(planetsInfo),
        backgroundColor: "yellow",
      },
    ],
  };

  const options = {
    responsive: true,
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
  return <Bar options={options} data={data} />;
};

export default Chart;
