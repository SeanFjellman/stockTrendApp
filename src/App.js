import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';  // Import your component for displaying products
import  Main from  './Main';
import StockChart from './StockChart';
function App() {

return(
  <Router>

<Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path='/stock-chart' element={StockChart}/>
      </Routes>
    </Router>

);

}

export default App;
