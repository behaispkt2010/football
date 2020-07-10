import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import { Link } from "react-router-dom";

const TopMenu = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">ABC TEST</NavbarBrand>
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
                <Link to="/listbranch">Chi nhánh</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/liststaff">Nhân viên</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/listrank">Danh hiệu</Link>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default TopMenu;
