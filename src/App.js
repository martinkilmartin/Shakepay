import logo from './assets/gfx/ShakepayLogo.svg';
import './App.css';

import AppBar from "./components/AppBar";
import Chart from "./components/Chart";

function App() {
  return (
    <div className="container">
      <AppBar
        brandName="Shakepay"
        logo={logo}
        logoAltText="Shakepay"
        />
        <Chart/>
    </div>
  );
}

export default App;
