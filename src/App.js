import React from 'react';
import ReactDOM from "react-dom";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { confirmWrapper, confirm } from "react-confirm";
import TopMenu from "../component/TopMenu";
import './App.css';

const Index = () => (
  <div>
    <h2>Trang chủ</h2>
    <div>Top nhân viên có nhiều Danh hiệu</div>
  </div>
);


function App() {
  return (
    <Router>
      <div className="App">
        <TopMenu />

        <Route path="/" exact component={Index} />
      </div>
    </Router>
  );
}

export default App;
