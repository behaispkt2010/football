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
import User from "./pages/User";
import Customer from "./pages/Customer";
import PickCourt from "./pages/PickCourt";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import PickCourtSuccess from "./pages/PickCourtSuccess";
import AuthUserApi from "./api/AuthUserApi";
import './fontawesome';

function App() {
    // console.log(AuthUserApi.getCurrentUser());
    return (
        <Router>
            <div className="App">
                <TopMenu />
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/manage-permission" component={Permission} />
                    <Route path="/manage-location-court" component={LocationCourt} />
                    <Route path="/manage-company" component={Company} />
                    <Route path="/manage-court" component={Court} />
                    <Route path="/manage-role" component={Role} />
                    <Route path="/manage-user" component={User} />
                    <Route path="/manage-customer" component={Customer} />
                    <Route path="/pick-court" component={PickCourt} />
                    <Route path="/success" component={PickCourtSuccess} />
            </div>
            <Footer />
        </Router>
    );
}

export default App;
