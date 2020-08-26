import React from "react";
import "./Footer.css";
import { Row, Col } from "reactstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Footer() {

	return (
		<div className="footer">
			<div className="footer-main">
				<div className="container">
					<Row>
						<Col md="4">
							<div className="footer-title">Thông tin liên hệ</div>
							<div className="footer-content">
								<div>
									<Link to="/facebook">Facebook</Link>
								</div>
								<div>
									<Link to="/gmail">Gmail</Link>
								</div>
							</div>
						</Col>
						<Col md="4">
							<div className="footer-title">Giới thiệu</div>
							<div className="footer-content"></div>
						</Col>
						<Col md="4">
							<div className="footer-title">Ứng dụng di động</div>
							<div className="footer-content"></div>
						</Col>
					</Row>
				</div>
			</div>
			<div className="footer-copyright">
				<footer><small>&copy; Copyright 2020, BH-Ideas</small> </footer>
			</div>
		</div>
	)
}

export default Footer;