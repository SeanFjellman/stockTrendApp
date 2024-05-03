import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import './App.css'; // Custom CSS
import stockData from './data.json'; // Imported data from a local file
import StockChart from './StockChart'; // Ensure StockChart is imported



function Main() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    setStocks(stockData.data); // Set the imported data to the state
  }, []);

  return (
    <div className="App">
      <nav className="navbar navbar-expand-md bg-dark sticky-top border-bottom">
        <div className="container">
          <Link className="navbar-brand" to="/">Stock Trends App</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/stock-chart">Stocks</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <main>
            <div className="text-center">
              <h1 className="display-3">Stock Trends</h1>
              <p className="lead">Check out the latest trends in the stock market.</p>
              <div className="d-flex flex-wrap justify-content-center">
                {stocks.map(stock => (
                  <div className="card m-2" style={{ width: '18rem' }} key={stock.stockID}>
                    <img src={stock.url} className="card-img-top" alt={stock.stockID} />
                    <div className="card-body">
                      <h5 className="card-title">{stock.stockID}</h5>
                      <p className="card-text">{stock.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        }/>
        {/* Additional Routes can be added here */}
      </Routes>

      <footer className="text-center mt-4">
        <p>&copy; 2024 Stock Trends App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Main;
