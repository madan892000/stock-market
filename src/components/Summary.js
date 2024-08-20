import React from 'react';
import './Summary.css';

const Summary = ({ data }) => {
    return (
        <div className="summary-container">
            <p><span className="label">Name of the Stock:</span> {data.symbol}</p>
            <p><span className="label">Volume of Stock:</span> {data.volume}</p>
            <p><span className="label">Open Price:</span> {data.open} USD</p>
            <p><span className="label">Close Price:</span> {data.close} USD</p>
            <p><span className="label">High Price:</span> {data.high} USD</p>
            <p><span className="label">Low Price:</span> {data.low} USD</p>
            <p><span className="label">Pre-Market Price:</span> {data.preMarket} USD</p>
            <p><span className="label">After-Hours Price:</span> {data.afterHours} USD</p>
            <p><span className="label">Date:</span> {data.from}</p>
        </div>
    );
}

export default Summary;
