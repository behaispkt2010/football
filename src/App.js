import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { confirmWrapper, confirm } from "react-confirm";
import TopMenu from "./component/TopMenu";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./component/Login";
import Register from "./component/Register";
import Profile from "./component/Profile";
import AuthUserApi from "./api/AuthUserApi";

const Index = () => (
  <div>
    <h2>Trang chủ</h2>
  </div>
);

function App() {
    // console.log(AuthUserApi.getCurrentUser());
    return (
        <Router>
            <div className="App">
                <TopMenu 

                />

                <Route path="/" exact component={Index} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
            </div>
        </Router>
    );
}

export default App;
