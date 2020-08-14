import React, {useState, useEffect} from 'react';
import {
	Col, Row, Container, Button
} from "reactstrap";
import PickCourtApi from "../api/PickCourtApi";

function PickCourtSuccess() {
	const [dataSuccess, setDataSuccess] = useState(null);
	useEffect(() => {
		const fetchData = async() => {
			try {
				
			} catch (errordata) { 
				console.log("Fail to fetch data: ", errordata);
			}
		}
		fetchData();
	},[]);
	return (
		<h2>
			Thank you !
		</h2>
	);
}

export default PickCourtSuccess;