import React, { useEffect, useState } from 'react';
import './Statistics.css';

const Statistics = ({ name }) => {
  const [dividendData, setDividendData] = useState([]);
  const [financialData, setFinancialData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dividendLimit, setDividendLimit] = useState(10); // Default dividend limit to 10
  const [financialLimit, setFinancialLimit] = useState(10); // Default financial limit to 10

  const handleDividendLimitChange = (event) => {
    setDividendLimit(event.target.value);
  };

  const handleFinancialLimitChange = (event) => {
    setFinancialLimit(event.target.value);
  };

  const fetchDividendData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.polygon.io/v3/reference/dividends?ticker=${name.toUpperCase()}&limit=${dividendLimit}&apiKey=7pur3uCKisa8uoLDiKXvP9kEzYEkzQ4i`
      );
      const data = await response.json();
      setDividendData(data.results || []);
      setLoading(false);
    } catch (error) {
      setError('Error fetching dividend data');
      setLoading(false);
    }
  };

  const fetchFinancialData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.polygon.io/vX/reference/financials?ticker=${name.toUpperCase()}&limit=${financialLimit}&apiKey=7pur3uCKisa8uoLDiKXvP9kEzYEkzQ4i`
      );
      const data = await response.json();
      setFinancialData(data.results || []);
      setLoading(false);
    } catch (error) {
      setError('Error fetching financial data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDividendData();
    fetchFinancialData();
  }, []); // Initial fetch for both tables

  const handleDividendSubmit = (event) => {
    event.preventDefault();
    fetchDividendData();
  };

  const handleFinancialSubmit = (event) => {
    event.preventDefault();
    fetchFinancialData();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="statistics-container">
      <h3>Statistics for {name.toUpperCase()}</h3>
      
      {/* Dividend Data Section */}
      <h4>Dividend Data</h4>
      <form onSubmit={handleDividendSubmit} className="limit-form">
        <label htmlFor="dividend-limit">Dividend Limit: </label>
        <input
          type="number"
          id="dividend-limit"
          value={dividendLimit}
          onChange={handleDividendLimitChange}
          min="1"
          className="limit-input"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {dividendData.length > 0 ? (
        <table className="statistics-table">
          <thead>
            <tr>
              <th>Ex-Dividend Date</th>
              <th>Record Date</th>
              <th>Pay Date</th>
              <th>Declared Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {dividendData.map((dividend, index) => (
              <tr key={index}>
                <td>{dividend.ex_dividend_date || 'N/A'}</td>
                <td>{dividend.record_date || 'N/A'}</td>
                <td>{dividend.pay_date || 'N/A'}</td>
                <td>{dividend.declaration_date || 'N/A'}</td>
                <td>{dividend.cash_amount || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No dividend data available</p>
      )}

      {/* Financial Data Section */}
      <h4>Financial Data</h4>
      <form onSubmit={handleFinancialSubmit} className="limit-form">
        <label htmlFor="financial-limit">Financial Limit: </label>
        <input
          type="number"
          id="financial-limit"
          value={financialLimit}
          onChange={handleFinancialLimitChange}
          min="1"
          className="limit-input"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {financialData.length > 0 ? (
        <table className="statistics-table">
          <thead>
            <tr>
              <th>Fiscal Period</th>
              <th>Timeframe</th>
              <th>Current Assets</th>
              <th>Current Liabilities</th>
              <th>Equity</th>
              <th>Liabilities</th>
            </tr>
          </thead>
          <tbody>
            {financialData.map((financial, index) => (
              <tr key={index}>
                <td>{financial.fiscal_period || 'N/A'}</td>
                <td>{financial.timeframe || 'N/A'}</td>
                <td>{financial.financials?.balance_sheet?.current_assets?.value || 'N/A'}</td>
                <td>{financial.financials?.balance_sheet?.current_liabilities?.value || 'N/A'}</td>
                <td>{financial.financials?.balance_sheet?.equity?.value || 'N/A'}</td>
                <td>{financial.financials?.balance_sheet?.liabilities?.value || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No financial data available</p>
      )}
    </div>
  );
};

export default Statistics;
