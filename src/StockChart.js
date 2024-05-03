import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, LineElement, LinearScale, CategoryScale, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import './StockGraph.css'

ChartJS.register(LineElement, LinearScale, CategoryScale, PointElement);

const StockChart = () => {
    const [stockNames, setStockNames] = useState([]);
    const [currentStockSymbol, setCurrentStockSymbol] = useState('AAPL');
    const [currentPrice, setCurrentPrice] = useState(0);
    const [priceChange, setPriceChange] = useState(0);
    const [percentChange, setPercentChange] = useState(0);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [selectedTimeRange, setSelectedTimeRange] = useState('1w');

    useEffect(() => {
        fetchStockNames();
        fetchStockData(selectedTimeRange, currentStockSymbol);
    }, [selectedTimeRange, currentStockSymbol]);

    const fetchStockNames = async () => {
        try {
            const response = await axios.get('http://localhost:3000');
            setStockNames(response.data);
        } catch (error) {
            console.error('Error loading stock data:', error);
        }
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: true,
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: true
                },
                beginAtZero: false, // Adjust based on your data's nature
                title: {
                    display: true,
                    text: 'Price (USD)'
                }
            }
        }
    };
    
    const fetchStockData = async (range, stockSymbol) => {
        const endDate = new Date();
        let startDate = new Date();
        switch (range) {
            case '1w':
                startDate.setDate(endDate.getDate() - 7);
                break;
            case '1m':
                startDate.setMonth(endDate.getMonth() - 1);
                break;
            case '3m':
                startDate.setMonth(endDate.getMonth() - 3);
                break;
            case '1y':
                startDate.setFullYear(endDate.getFullYear() - 1);
                break;
            default:
                startDate.setFullYear(endDate.getFullYear() - 1);
        }
        const apiURL = `http://api.marketstack.com/v1/eod?access_key=c755b06e6274cfa83bf68ad6b4fc56ac&symbols=${stockSymbol}&date_from=${startDate.toISOString().split('T')[0]}&date_to=${endDate.toISOString().split('T')[0]}`;

        try {
            const response = await axios.get(apiURL);
            const data = response.data.data;
            prepareChartData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const prepareChartData = (data) => {
        data.sort((a, b) => new Date(a.date) - new Date(b.date));
        const dates = data.map(item => item.date.split('T')[0]);
        const prices = data.map(item => item.close);
        const startingPrice = prices[0];
        const currentPrice = prices[prices.length - 1];
        const priceChange = currentPrice - startingPrice;
        const percentChange = (priceChange / startingPrice) * 100;

        setCurrentPrice(currentPrice);
        setPriceChange(priceChange);
        setPercentChange(percentChange);

        setChartData({
            labels: dates,
            datasets: [{
                label: 'Stock Price',
                data: prices,
                borderColor: 'rgb(75, 192, 192)',
                fill: false,
            }]
        });
    };

    return (
        <div className="container">
            <div className="stock-info">
                <h1>Stock Name: {currentStockSymbol}</h1>
                <p>Current Price: ${currentPrice.toFixed(2)}</p>
                <p>Change: ${priceChange.toFixed(2)} ({percentChange.toFixed(2)}%)</p>
            </div>
            <div className="time-range-selector">
                {['1w', '1m', '3m', '1y'].map(range => (
                    <button key={range} className={`btn ${selectedTimeRange === range ? 'active' : ''}`}
                            onClick={() => setSelectedTimeRange(range)}>
                        {range.toUpperCase()}
                    </button>
                ))}
            </div>
            <div className="chart-container">
                <Line data={chartData} options={options} />
            </div>
            <footer>
                © 2024 Stock Tracker
            </footer>
        </div>
    );
    
    
};

export default StockChart;
