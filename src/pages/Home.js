import React from "react";
import { Container, Row, Col, Button, Modal } from "reactstrap";
import sb from '../img/sb.jpg';
import sb1 from '../img/sb1.jpg';
import "./Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  UncontrolledCarousel, CarouselCaption
} from 'reactstrap';
/*import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";*/

function Home() {
	const items = [
		{id: 1, src: sb, captionText: "", header: ""},
		{id: 2, src: sb1, captionText: "", header: ""},
	]
	
	return (
		<div className="home-page">
			<div className="home-info">
				<UncontrolledCarousel className="home-slider" items={items} indicators={false} controls={false} />
				<div className="home-info-company">
					<h1 className="home-name-app d-none d-md-block">{process.env.REACT_APP_NAME_COMPANY}</h1>
					<h2 className="sologen">TÌM ĐỐI THỦ DỄ DÀNG - CÁP KÈO NHANH CHÓNG</h2>
				</div>
			</div>
			<div className="home-intro">
				<div className="home-introduce">Trang đặt sân bóng online của sân {process.env.REACT_APP_NAME_COMPANY}</div>
				<div className="home-introduce-detail">
					<Row>
						<Col md="6">
							<FontAwesomeIcon icon={['fas', 'rocket']} fixedWidth className="home-introduce-icon" />
							<div className="home-introduce-header">Đặt sân bóng online</div>
							<p className="home-introduce-content">Đặt sân online, tiện lợi, dễ dàng</p>
						</Col>
						<Col md="6">
							<FontAwesomeIcon icon={['fas', 'calendar']} fixedWidth className="home-introduce-icon" />
							<div className="home-introduce-header">Quản lý sân bóng online</div>
							<p className="home-introduce-content">Quản lý lịch đặt đơn giản, tiếp nhận đặt sân online dễ dàng</p>

						</Col>
					</Row>
				</div>
			</div>
		</div>
	)
}

export default Home;