import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  div,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown
} from "reactstrap";

import AuthUserApi from "../api/AuthUserApi";
import { Link } from "react-router-dom";

const TopMenu = props => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [showAdmin, setShowAdmin] = useState(false);
    const [showSuperAdmin, setShowSuperAdmin] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    useEffect(() => {
        const user = AuthUserApi.getCurrentUser();
        if(user) {
            setCurrentUser(user);
            setShowAdmin(user.role.includes("admin"));
            setShowSuperAdmin(user.role.includes("super-admin"));
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
                            <div className='nav-link'>
                                <Link to="/">Trang chủ</Link>
                            </div>
                        </NavItem>
                        {(showAdmin || showSuperAdmin) && (
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>Quản lý</DropdownToggle>
                            <DropdownMenu>
                                {showSuperAdmin && (
                                <div>
                                    <DropdownItem>
                                        <Link to="/manage-company">Quản lý doanh nghiệp</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/manage-role">Quản lý phân quyền</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/manage-permission">Quản lý quyền</Link>
                                    </DropdownItem>
                                </div>
                                )}
                                {(showAdmin || showSuperAdmin) && (
                                <div>
                                    <DropdownItem>                          
                                        <Link to="/manage-pick">Quản lý danh sách đặt sân</Link>
                                    </DropdownItem>
                                    <DropdownItem> 
                                        <Link to="/manage-customer">Quản lý khách hàng</Link>
                                    </DropdownItem>
                                    <DropdownItem> 
                                        <Link to="/manage-user">Quản lý nhân viên</Link>
                                    </DropdownItem>
                                    <DropdownItem> 
                                        <Link to="/manage-location-court">Quản lý bãi</Link>
                                    </DropdownItem>
                                    <DropdownItem> 
                                        <Link to="/manage-court">Quản lý sân</Link>
                                    </DropdownItem>
                                </div>
                                )}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        )}
                        <NavItem>
                            <div className='nav-link'>
                                <Link to="/pick-court">Đặt sân</Link>
                            </div>
                        </NavItem>
                        
                    </Nav>
                    {currentUser ? (
                    <Nav>
                        <NavItem>
                            <div className='nav-link'>
                                <Link to="/profile">Thông tin {currentUser.name}</Link>
                            </div>
                        </NavItem>
                        <NavItem>
                            <div className='nav-link'>
                                <Link to="/logout" onClick={logOut}>Đăng xuất</Link>
                            </div>
                        </NavItem>
                    </Nav>
                    ) : (
                    <Nav>
                        <NavItem>
                            <div className='nav-link'>
                                <Link to="/login">Đăng nhập</Link>
                            </div>
                        </NavItem>
                    </Nav>
                    )}
                </Collapse>
            </Navbar>
        </div>
    );
};

export default TopMenu;
