import React from 'react';
import './StockDetails.css';

const StockDetails = ({ data }) => {
    if (!data) return null;

    const stockData = data;
    const round = (value, decimals) => {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    };

    const difference = round(stockData.open - stockData.close, 2);
    const percentageChange = round((difference / stockData.open) * 100, 2);

    return (
        <div className="stock-details">
            <h1 className="stock-price">
                {stockData.open}
                <span className="currency">USD</span>
            </h1>
            <p className={`price-change ${percentageChange > 0 ? 'positive' : 'negative'}`}>
                {"+"+difference} 
                <span className="percentage-change">({percentageChange}%)</span>
            </p>
        </div>
    );
}

export default StockDetails;
