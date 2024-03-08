let stockNames = [];

fetch('stocks.json')
    .then(response => response.json())
    .then(data => {
        stockNames = data;
    })
    .catch(error => console.error('Error loading stock data:', error));


let currentStockSymbol = 'AAPL'; // Default stock symbol

document.getElementById('stockSearchInput').addEventListener('input', function(e) {
    let a, b, val = this.value;
    closeAllLists();
    if (!val) { return false; }
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    for (let i = 0; i < stockNames.length; i++) {
        if (stockNames[i].symbol.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + stockNames[i].symbol.substr(0, val.length) + "</strong>";
            b.innerHTML += stockNames[i].symbol.substr(val.length) + " (" + stockNames[i].name + ")";
            b.innerHTML += "<input type='hidden' value='" + stockNames[i].symbol + "'>";
            b.addEventListener("click", function(e) {
                document.getElementById('stockSearchInput').value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
                lookupStock(document.getElementById('stockSearchInput').value); // Assuming lookupStock is implemented
            });
            a.appendChild(b);
        }
    }
});

function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != document.getElementById('stockSearchInput')) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
}

document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});



document.addEventListener('DOMContentLoaded', function() {
    setTimeRange('1w'); // Default time range on page load
});



function setTimeRange(range) {
    // Update the active button
    updateActiveRangeButton(range);

    // Update the time frame text
    updateTimeFrameText(range);
    

    // Fetch and display stock data for the selected range
    fetchStockData(range, currentStockSymbol);
}


function updateActiveRangeButton(range) {
    const buttons = document.querySelectorAll('.time-range-selector button');
    buttons.forEach(button => {
        if (button.textContent === range) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function fetchStockData(range, stockSymbol = 'AAPL') {
    
    const apiKey = 'c755b06e6274cfa83bf68ad6b4fc56ac'; // Replace with your MarketStack API key



    let endDate = new Date();
    let startDate = new Date();

    switch(range) {
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
        case 'all':
            startDate = new Date(0); // Sets the date to the earliest possible date
            break;
        default:
            startDate.setFullYear(endDate.getFullYear() - 1);
    }

    startDate = startDate.toISOString().split('T')[0];
    endDate = endDate.toISOString().split('T')[0];

    const apiUrl = `http://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=${stockSymbol}&date_from=${startDate}&date_to=${endDate}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error.message);
            }
            prepareChartData(data.data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function prepareChartData(stockData, range) {
    // Ensure the data is sorted by date in ascending order
    stockData.sort((a, b) => new Date(a.date) - new Date(b.date));

    const dates = stockData.map(item => item.date.split('T')[0]);
    const prices = stockData.map(item => item.close);

    // Get the starting and current price for the percentage change calculation
    const startingPrice = prices[0]; // First element after sorting
    const currentPrice = prices[prices.length - 1]; // Last element
    const priceChange = currentPrice - startingPrice;
    const percentChange = (priceChange / startingPrice) * 100;

    // Update the UI
    updateStockInfoUI(currentPrice,priceChange,percentChange)

    drawChart(dates, prices);
}

function updateStockInfoUI(currentPrice, priceChange, percentChange) {

    document.getElementById('currentPrice').textContent = `Current Price: $${currentPrice.toFixed(2)}`;
    document.getElementById('priceChange').textContent = `Change: $${priceChange.toFixed(2)} (${percentChange.toFixed(2)}%)`;
    document.getElementById('priceChange').style.color = priceChange >= 0 ? 'green' : 'red';
    document.getElementById('stockName').textContent = `Stock Name: ${currentStockSymbol.toUpperCase()}`;

}


function drawChart(dates, prices) {
    const ctx = document.getElementById('stockChart').getContext('2d');

    // Create the gradient
    const gradient = createGradient(ctx, prices);

    if (window.stockChart instanceof Chart) {
        window.stockChart.destroy();
    }

    window.stockChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Stock Price',
                data: prices,
                backgroundColor: gradient,
                borderColor: gradient,
                borderWidth: 1,
                fill: true 
            }]
        },
        options: {
        
                tooltips: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(tooltipItem, data) {
                            return `Price: ${tooltipItem.yLabel}`;
                        }
                    }
                },animation: {
                    duration: 200, // general animation time
                    easing: 'easeOutBack'
                },
                plugins: {
                    zoom: {
                        pan: {
                            enabled: true,
                            mode: 'x',
                        },
                        zoom: {
                            enabled: true,
                            mode: 'x',
                        }
                    }
                }
                
        
            
        }
    });
}
function createGradient(ctx, prices) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);

    // Check if the stock is trending up or down
    if (prices[0] < prices[prices.length - 1]) {
        // Price is going up - green
        gradient.addColorStop(0, 'rgba(0, 250, 0, 0.5)'); // Start color
        gradient.addColorStop(1, 'rgba(0, 150, 0, 0.5)'); // End color
    } else {
        // Price is going down - red
        gradient.addColorStop(0, 'rgba(250, 0, 0, 0.5)'); // Start color
        gradient.addColorStop(1, 'rgba(150, 0, 0, 0.5)'); // End color
    }

    return gradient;
}
function updateTimeFrameText(range) {
    const timeFrameText = {
        '1d': 'Today',
        '1w': 'Past Week',
        '1m': 'Past Month',
        '3m': 'Past 3 Months',
        '1y': 'Past Year',
        'all': 'All Time'
    };

    document.getElementById('timeFrameText').textContent = `Time Frame: ${timeFrameText[range]}`;
}
document.getElementById('stockSearchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the form from submitting traditionally
    let searchTerm = document.querySelector('#stockSearchForm input').value.trim();
    
    if (searchTerm) {
        lookupStock(searchTerm);
    }
});


function lookupStock(stockSymbol) {
    currentStockSymbol = stockSymbol; // Update the global variable
    const selectedRange = getSelectedRange();


    setTimeRange('1w'); // Default time range on page load

}



function getSelectedRange() {
    // Get the selected range from the buttons or store it globally
    const activeButton = document.querySelector('.time-range-selector button.active');
    return activeButton ? activeButton.textContent : '1w'; // Default to 1 week
}



function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const symbol = getQueryParam('symbol');

if (symbol) {
    currentStockSymbol = symbol;

    updateStockNameDisplay(symbol);
}

function updateStockNameDisplay(symbol) {
    
    let stockName = '';
    for (let i = 0; i < stockNames.length; i++) {
        if (stockNames[i].symbol === symbol) {
            stockName = stockNames[i].name;
            break;
        }
    }

    if (stockName) {
        document.getElementById('stockName').textContent = `Stock Name: ${stockName}`;
    }
}
