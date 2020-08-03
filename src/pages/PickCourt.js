import React, {useState, useEffect} from "react";
import {
	Col, Row, Container, Button, Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  FormGroup
} from "reactstrap";
import PickCourtApi from "../api/PickCourtApi";
import TimeFrameApi from "../api/TimeFrameApi";
import LocationCourtApi from "../api/LocationCourtApi";
import "./PickCourt.css";
import useForm from "../component/useForm";
import {confirm} from "../component/Confirmation";

function PickCourt() {
	const [timeframeList, setTimeframeList] = useState([]);
	const [dateList, setDateList] = useState([]);
	const [locationCourtList, setLocationCourtList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [modal, setModal] = useState(false);
	const toggle = () => {
		setModal(!modal);
	}
	const rulesValidate = [ 
    {
      	field: "idlocationcourt",
      	method: "isEmpty",
      	validWhen: false,
      	message: "Vui lòng chọn bãi"
    }];
    
    const initialUserInput = {
        idlocationcourt: ""
    };
    const {
        userInput,
        errors,
        handleChange,
        handleSubmit,
        setUserInput
    } = useForm(submitData, rulesValidate, initialUserInput);

    function submitData() {
    	setLoading(true);
    	
    }
	useEffect(() => {
		const fetchLocationCourtList = async() => {
			try {
				const param = {
					'_page' : 1
				};
				const response = await LocationCourtApi.getAll(param);
				// console.log(response);
				setLocationCourtList(response.data);
				if(response.data) 
					toggle();
			} catch (errordata) { 
				console.log("Fail to fetch data: ", errordata);
			}
		}
		fetchLocationCourtList();
	}, []);
	useEffect(() => {
		const fetchTimeframeList = async() => {
			try {
				const param = {
					'_page' : 1
				};
				const response = await TimeFrameApi.getAll(param);
				// console.log(response);
				setTimeframeList(response.data.data);
				setDateList(response.data.arrDate);
			} catch (errordata) { 
				console.log("Fail to fetch data: ", errordata);
			}
		}
		fetchTimeframeList();
	}, []);
	
	function showListTimeFrame() {
		return timeframeList.map((timeFrame, idx) => {
			return (
				<span key={idx} className="date"> * {timeFrame.name}</span>
			);
		})
	}
	function showListDate() {
		return dateList.map((dataDate, idx) => {
			return (
				<Row key={idx} className="item-date">
					<Col xs="10" className="item-timeframe">
						<div>Chọn sân</div>
						<div>Giờ trống: {showListTimeFrame()}
						</div>
					</Col>
					<Col className="show-date">
						<Col>{dataDate}</Col>
					</Col>
				</Row>
			);
		})
	}
	function getLocationCourt() {
  		return locationCourtList.map((dataLocation, idx) => {
  			return (
  				<option key={idx} value={dataLocation.id}>{dataLocation.name}</option>
			)
  		});
  	}
  	function SetLocationCourt() {
  		setUserInput({
  			idlocationcourt: userInput.idlocationcourt
  		});
  		if(userInput.idlocationcourt != '') {
  			toggle();
  		} else {
  			confirm("Bạn vui lòng chọn bãi!!!", "OK", "Bỏ", false);
  		}
  	}
	return ( 
		<div>
			<Row>
				<Col>
					<h1>Đặt sân bóng đá</h1>
				</Col>
			</Row>
			<Row>
				<Col className="list-date" xs="12">
					{ showListDate() }
				</Col>
			</Row>
			{locationCourtList != null && <Modal isOpen={modal} toggle={toggle} backdrop="static"
        keyboard={false}>
		        <ModalHeader>Chọn bãi</ModalHeader>
		        <ModalBody>
		        	<FormGroup>
			          	<InputGroup>
				            <InputGroupAddon addonType="prepend">
				              	<InputGroupText>Bãi</InputGroupText>
				            </InputGroupAddon>
				            <Input
				            	type="select"
				              	name="idlocationcourt"
				              	onChange={handleChange}>
				              	<option value="">Lựa chọn bãi</option>
				              	{getLocationCourt()}
			              	</Input>
			          	</InputGroup>
		          	</FormGroup>
		        </ModalBody>
		        <ModalFooter>
		          	<Button color="primary" onClick={SetLocationCourt} className="btnAddNew"disabled={loading}>{loading ? 'Loading...' : 'Xác nhận'}
		          	</Button>{" "}
		        </ModalFooter>
	      	</Modal>
	      	}
		</div>
	);
}

export default PickCourt;