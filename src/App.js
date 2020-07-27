import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { confirmWrapper, confirm } from "react-confirm";
import TopMenu from "./component/TopMenu";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Role from "./pages/Role";
import Permission from "./pages/Permission";
import Company from "./pages/Company";
import LocationCourt from "./pages/LocationCourt";
import Court from "./pages/Court";
import AuthUserApi from "./api/AuthUserApi";
import './fontawesome';

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
                <TopMenu />

                <Route path="/" exact component={Index} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/manage-permission" component={Permission} />
                <Route path="/manage-location-court" component={LocationCourt} />
                <Route path="/manage-company" component={Company} />
                <Route path="/manage-court" component={Court} />
                <Route path="/manage-role" component={Role} />
            </div>
        </Router>
    );
}

export default App;
