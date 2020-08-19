import React, {useState, useEffect} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
	Col, Row, Container, Button
} from "reactstrap";
import PickCourtApi from "../api/PickCourtApi";
import './PickCourt.css';
import queryString from 'query-string';

function PickCourtSuccess() {
	const location = useLocation();
	const [dataSuccess, setDataSuccess] = useState(null);
	const history = useHistory();
	useEffect(() => {
		if(location.data != null) {
			setDataSuccess(location.data);
		} else {
			const dataSearch = queryString.parse(location.search);
			const fetchData = async() => {
				try {
					const response = await PickCourtApi.get(dataSearch.id);
					setDataSuccess(response.data);
				} catch (errordata) { 
					console.log("Fail to fetch data: ", errordata);
				}
			}
			fetchData();
		}
	},[location]);

	function showSuccess() {
		return dataSuccess.map((item, idx) => {
			return (
				<div key={idx}>
					<Row>
						<Col sm="12" md={{ size: 6, offset: 3 }} className="info">
							<span>Ngày lăn bóng</span>: 
							<span> {item['date']}</span>
						</Col>
					</Row>
					<Row>
						<Col sm="12" md={{ size: 6, offset: 3 }} className="info">
						<span>Khung giờ</span>: 
						<span> {item['time_frame']}</span>
						</Col>
					</Row>
					<Row>
						<Col sm="12" md={{ size: 6, offset: 3 }} className="info">
						<span>Tên sân</span>: 
						<span> {item['nameCourt']}</span>
						</Col>
					</Row>
					<Row>
						<Col sm="12" md={{ size: 6, offset: 3 }} className="info">
						<span>Địa điểm</span>: 
						<span> {item['nameLocation']}</span>
						</Col>
					</Row>
					<Row>
						<Col sm="12" md={{ size: 6, offset: 3 }} className="info">
						<span>SĐT đặt sân</span>: 
						<span> {item['phoneCus']}</span>
						</Col>
					</Row>
					<Row>
						<Col sm="12" md={{ size: 6, offset: 3 }} className="info">
						<span>Loại sân</span>: 
						<span> {item['limit_player']} người</span>
						</Col>
					</Row>
				</div>
			);
		})
	}
	function backToPick() {
		history.push({
			pathname: '/pick-court'
		});
	}
	return (
		<div>
			<h2>
				<div>Thank you !</div>
				<div>Thông tin đặt sân</div>
			</h2>
			{ dataSuccess != null && showSuccess()}
			<div className="btnBack">
				<Button color="primary" onClick={backToPick}>
		            Quay về trang đặt sân
		      	</Button>
	      	</div>
		</div>
	);
}

export default PickCourtSuccess;