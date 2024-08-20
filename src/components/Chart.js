import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './Chart.css';

const Chart = ({ name }) => {
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState(new Date('2023-01-01'));
  const [endDate, setEndDate] = useState(new Date('2023-02-10'));
  const [containerWidth, setContainerWidth] = useState(window.innerWidth - 40);

  const setRange = (days) => {
    const newEndDate = new Date();
    const newStartDate = new Date();
    newStartDate.setDate(newEndDate.getDate() - days);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const start = startDate.toISOString().split('T')[0];
        const end = endDate.toISOString().split('T')[0];
        const response = await fetch(
          `https://api.polygon.io/v2/aggs/ticker/${name}/range/1/day/${start}/${end}?adjusted=true&sort=asc&apiKey=7pur3uCKisa8uoLDiKXvP9kEzYEkzQ4i`
        );
        console.log(`https://api.polygon.io/v2/aggs/ticker/${name}/range/1/day/${start}/${end}?adjusted=true&sort=asc&apiKey=7pur3uCKisa8uoLDiKXvP9kEzYEkzQ4i`)
        const data = await response.json();
        const formattedData = data.results.map(item => ({
          name: new Date(item.t * 1000).toLocaleDateString(),
          uv: item.o,
          pv: item.c,
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();

    const updateContainerWidth = () => {
      setContainerWidth(document.querySelector('.chart-container').offsetWidth);
    };

    window.addEventListener('resize', updateContainerWidth);
    updateContainerWidth();

    return () => {
      window.removeEventListener('resize', updateContainerWidth);
    };
  }, [startDate, endDate]);

  return (
    <div className="chart-container">
      <h2 className="chart-title">Stock Name : {name}</h2>
      <div className="date-picker-container">
        <p>From : <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy-MM-dd"
          className="date-picker"
          placeholderText="Start Date"
        /></p>
        <p>To : <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy-MM-dd"
          className="date-picker"
          placeholderText="End Date"
        /></p>
      </div>
      
      <div className="time-range-buttons">
        <button onClick={() => setRange(1)}>1 Day</button>
        <button onClick={() => setRange(3)}>3 Days</button>
        <button onClick={() => setRange(7)}>1 Week</button>
        <button onClick={() => setRange(30)}>1 Month</button>
        <button onClick={() => setRange(180)}>6 Months</button>
        <button onClick={() => setRange(365)}>1 Year</button>
      </div>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            width={containerWidth}
            height={300}
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default Chart;
