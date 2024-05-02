import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap CSS
import './App.css';  // Custom CSS
import stockData from './data.json';  // Imported data from local file

function App() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    setStocks(stockData.data);  // Set the imported data to the state
    console.log(stockData.data);  // Debugging: Log the imported data
  }, []);

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-md bg-dark sticky-top border-bottom">
          <div className="container">
            <a className="navbar-brand" href="/">Stock Trends App</a> {/* Use <a> tag instead of Link */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/stocks">Stocks</a> {/* Use <a> tag instead of Link */}
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">About</a> {/* Use <a> tag instead of Link */}
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
                      <img src={stock.url} className="card-img-top" alt={stock.stockID} /> {/* Image tag added */}
                      <div className="card-body">
                        <h5 className="card-title">{stock.stockID}</h5>
                        <p className="card-text">{stock.description}</p>
                        <a href="/comsFinal/stockTrendApp/LearnMore.html" className="btn btn-primary">Learn More</a> {/* Use <a> tag instead of Link */}
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
    </Router>
  );
}

export default App;
