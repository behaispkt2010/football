import React, { useState, useEffect } from "react";
import AuthUserApi from "../api/AuthUserApi";
import PickCourtApi from "../api/PickCourtApi";
import "./Profile.css";
import TablesComponent from "../component/TablesComponent";

const Profile = () => {
	const currentUser = AuthUserApi.getCurrentUser();
	const [list, setList] = useState([]);
	useEffect(() => {
		const fetchDataList = async() => {
			try {
				const param = {
					'iduser' : currentUser.id
				};
				const response = await PickCourtApi.getAllPicked(param);
				// console.log(param);
				setList(response.data);
			} catch (errordata) { 
				console.log("Fail to fetch data: ", errordata);
			}
		}
		fetchDataList();
	}, []);
	let arrFieldShow = [
	    { nameCourt: "Tên sân" },
	    { date: "Ngày lăn bóng" },
	    { time_frame: "Khung giờ" },
	    { address: "Địa điểm" },
	    { phoneCus: "SĐT đặt sân" },
	    { limit_player: "Loại sân" },
  	];
	return (
		<div className="container">
			<header className="jumbotron">
				<h3>
					<strong>{currentUser.name}</strong> Profile
				</h3>
				<p><strong>Phone:</strong> {currentUser.phone}</p>
				<p><strong>Email:</strong> {currentUser.email}</p>
				<strong>Authorities:</strong>
				<ul className="role-list">
		        	{currentUser.role && currentUser.role.map((role, index) => <li key={index}>{role}</li>)}
		      	</ul>
			</header>
			<h3>Danh sách sân đã đặt</h3>
			{list !== null && ( 
	        <TablesComponent
	          	list={list}
	          	dataField={arrFieldShow}
	          	showFunction='0'
	        />
	      	)}
			
    	</div>
	);
}

export default Profile;