import './App.css';

import Table from './Table';
import cities from './by-cities.json';

const normalized = cities[0].regions.reduce((result, current) => {
  const row = current.cities.map((city) => {
    return { name: city.name, region: current.name };
  });

  return [...result, ...row];
}, []);

function App() {

  return <Table data={normalized} />

}

export default App;
