import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import AuthUserApi from "../api/AuthUserApi";
import { Link } from "react-router-dom";

const TopMenu = props => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const toggle = () => setIsOpen(!isOpen);
    useEffect(() => {
        const user = AuthUserApi.getCurrentUser();
        if(user) {
            setCurrentUser(user);
        }
    },[]);
    const logOut = () => {
        AuthUserApi.logout();
    }
    return (
        <div>
            <Navbar color="light" light expand="md">
            <NavbarBrand href="/">SEAGAME</NavbarBrand>
            <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink>
                                <Link to="/">Trang chủ</Link>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                <Link to="/pick-court">Đặt sân</Link>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    {currentUser ? (
                    <Nav>
                        <NavItem>
                            <NavLink>
                                <Link to="/profile">Thông tin {currentUser.name}</Link>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                <Link to="/logout" onClick={logOut}>Đăng xuất</Link>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    ) : (
                    <Nav>
                        <NavItem>
                            <NavLink>
                                <Link to="/login">Đăng nhập</Link>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                <Link to="/register">Đăng ký</Link>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    )}
                </Collapse>
            </Navbar>
        </div>
    );
};

export default TopMenu;
