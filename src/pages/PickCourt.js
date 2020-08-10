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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PickCourt() {
	const [timeframeList, setTimeframeList] = useState([]);
	const [dateList, setDateList] = useState([]);
	const [locationCourtList, setLocationCourtList] = useState([]);
	const [courtPlayerList, setCourtPlayerList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [modal, setModal] = useState(false);
	const [modalPick, setModalPick] = useState(false);
	const [dateShow, setDateShow] = useState(false);
	const [message, setMessage] = useState(false);
	const toggle = () => {
		setModal(!modal);
	}
	const togglePick = () => {
		setModalPick(!modalPick);
	}
	const rulesValidate = [ 
    {
      	field: "idlocationcourt",
      	method: "isEmpty",
      	validWhen: false,
      	message: "Vui lòng chọn bãi"
    }];
    
    const initialUserInput = {
        idlocationcourt: "",
        limit_player: "",
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
				setCourtPlayerList(response.data.arrLimitPlayer);
			} catch (errordata) { 
				console.log("Fail to fetch data: ", errordata);
			}
		}
		fetchTimeframeList();
	}, []);
	function showCourtPlayer() {
		return courtPlayerList.map((courtPlayer, idx) => {
			return (
				<div className="pitch" key={idx}>
					<span key={idx}>Sân {courtPlayer.limit_player} người:</span>
					{showListTimeFrame()}
				</div>

			);
		})
	}
	function showListTimeFrame() {
		return timeframeList.map((timeFrame, idx) => {
			return (
				<span key={idx} className="date"> * {timeFrame.name}</span>
			);
		})
	}
	function ActionPickCourt(idtimeframe) {
		console.log(idtimeframe);
		console.log(dateShow);
		console.log(userInput.limit_player);
		const param = {
			'idtime_frame' : idtimeframe,
			'date': dateShow,
			'limit_player': userInput.limit_player,
		};
		const response = PickCourtApi.add(param).then(
			() => {
				toggle();
				setLoading(false);
				// window.location.reload();
			}, (error) => {
                const resMessage =
                    (error.response && error.response.message) || error.message || error.toString();
                setLoading(false);
                setMessage(resMessage);
            }
		);
	}
	function showListTimeFramePick() {
		return timeframeList.map((timeFrame, idx) => {
			return (
				<div key={idx} className="item-timeframe-pick">
					<div className="item-timeframe-info">
						<div className="item-timeframe-title">
							Khung giờ: { timeFrame.name }
						</div>
	 				</div>
					<div className="btnPick">
						<Button color="primary" onClick={() => ActionPickCourt(timeFrame.id)}>
				            Đặt sân
			          	</Button>
					</div>
				</div>
			);
		})
	}
	function showListDate() {
		return dateList.map((dataDate, idx) => {
			return (
				<Row key={idx} className="item-date" onClick={() => GetTimeFramePick(dataDate)}>
					<Col xs="10" className="item-timeframe">
						<div>Chọn sân</div>
						<div>Giờ trống: {showCourtPlayer()}
						</div>
						<div>
							Giờ có đội tìm đối thủ:
						</div>
					</Col>
					<Col className="show-date">
						<Col>{dataDate}</Col>
					</Col>
					<FontAwesomeIcon className="icon-right" icon={['fas', 'angle-right']} fixedWidth />
				</Row>
			);
		})
	}
	function GetTimeFramePick(date) {
		setDateShow(date);
		togglePick();
	}
	function getLocationCourt() {
  		return locationCourtList.map((dataLocation, idx) => {
  			return (
  				<option key={idx} value={dataLocation.id}>{dataLocation.name}</option>
			)
  		});
  	}
	function getCourtPlayer() {
  		return courtPlayerList.map((courtPlayer, idx) => {
  			return (
  				<option key={idx} value={courtPlayer.limit_player}>{courtPlayer.limit_player} người
  				</option>
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
			{(userInput.idlocationcourt == '' && locationCourtList != null) && <Modal isOpen={modal} toggle={toggle} backdrop="static"
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
	      	<Modal isOpen={modalPick} toggle={togglePick}>
		        <ModalHeader className="title-date-pick">Đặt sân ngày {dateShow}</ModalHeader>
		        <ModalBody>
		        	<div>
		        		<FormGroup>
				          	<InputGroup>
					            <InputGroupAddon addonType="prepend">
					              	<InputGroupText>Loại sân</InputGroupText>
					            </InputGroupAddon>
					            <Input
					            	type="select"
					              	name="limit_player"
					              	onChange={handleChange}>
					              	<option value="">Lựa chọn loại sân</option>
					              	{getCourtPlayer()}
				              	</Input>
				          	</InputGroup>
			          	</FormGroup>
			        	<div className="list-timeframe-pick">
			        		{ showListTimeFramePick() }
			        	</div>
		        	</div>
		        </ModalBody>
		        <ModalFooter>
		          	<Button color="secondary" onClick={togglePick}>
			            Hủy
		          	</Button>
		        </ModalFooter>
	      	</Modal>
		</div>
	);
}

export default PickCourt;