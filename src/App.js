import React, { useState } from 'react';
import StockDetails from './components/StockDetails';
import Summary from './components/Summary';
import Chart from './components/Chart';
import Statistics from './components/Statistics';
import Analysis from './components/Analysis';
import Settings from "./components/Settings"
import './App.css';

function App() {
  const [stockName, setStockName] = useState('');
  const [stockData, setStockData] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(''); 

  const getStockName = async () => {
    try {
      setStockName(stockName.toUpperCase())
      const response = await fetch(
        `https://api.polygon.io/v1/open-close/${stockName.toUpperCase()}/2023-01-09?adjusted=true&apiKey=7pur3uCKisa8uoLDiKXvP9kEzYEkzQ4i`
      );
      const data = await response.json();
      setStockData(data); 
      console.log(data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const changeStockName = (event) => {
    setStockName(event.target.value);
  };

  const renderFeatureComponent = () => {
    switch (selectedFeature) {
      case 'Summary':
        return <Summary data={stockData} />;
      case 'Chart':
        return <Chart name={stockName}/>;
      case 'Statistics':
        return <Statistics name={stockName}/>;
      case 'Analysis':
        return <Analysis name={stockName}/>;
      case 'Settings':
        return <Settings name={stockName}/>;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="scrolling-news">
        <p>*You can fetch data only 4 to 5 times per minute as it is free version. If you are unable to see data, refresh the page.</p>
      </div>
      <p>* Some suggested stocks to search : MSFT , GOOGL , AMZN , FB , TSLA , NVDA , INTC , ADBE , NFLX , PYPL.</p>
      <input type="text" onChange={changeStockName} value={stockName} />
      <button onClick={getStockName}>Submit</button>
      <StockDetails data={stockData} />

      <div className="features">
        <p 
          className={`feature-item ${selectedFeature === 'Summary' ? 'active' : ''}`}
          onClick={() => setSelectedFeature('Summary')}
        >
          Summary
        </p>
        <p 
          className={`feature-item ${selectedFeature === 'Chart' ? 'active' : ''}`}
          onClick={() => setSelectedFeature('Chart')}
        >
          Chart
        </p>
        <p 
          className={`feature-item ${selectedFeature === 'Statistics' ? 'active' : ''}`}
          onClick={() => setSelectedFeature('Statistics')}
        >
          Statistics
        </p>
        <p 
          className={`feature-item ${selectedFeature === 'Analysis' ? 'active' : ''}`}
          onClick={() => setSelectedFeature('Analysis')}
        >
          Analysis
        </p>
        <p 
          className={`feature-item ${selectedFeature === 'Settings' ? 'active' : ''}`}
          onClick={() => setSelectedFeature('Settings')}
        >
          Settings
        </p>
      </div>

      <div className="feature-component">
        {renderFeatureComponent()}
      </div>
    </div>
  );
}

export default App;

