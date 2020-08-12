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
	const [optionCourt, setOptionCourt] = useState(null);
	const [timeFrameFreeList, setTimeFrameFree] = useState(null);
	const [timeFrameShow, setTimeFrameShow] = useState(null);
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
				console.log(response);
				setTimeframeList(response.data);
			} catch (errordata) { 
				console.log("Fail to fetch data: ", errordata);
			}
		}
		fetchTimeframeList();
	}, []);
	function showListTimeFrame(TimeFrame) {
		return TimeFrame.map((dataTimeFree, index) => {
			return (
				<span key={index} className="timeframe"> * {dataTimeFree.name}</span>
			);
		})
	}
	function showListLimit(Limit) {
		return Limit.map((datalimit, index) => {
			return (
				<div key={index}>
					<span key={index} className="limit"> Sân {datalimit.limit}: {showListTimeFrame(datalimit.time_frame)}</span>
				</div>
			);	
		})
	}
	const ActionPickCourt = async idtimeframe => {
		const param = {
			'idtime_frame' : idtimeframe,
			'date': dateShow,
			'limit_player': userInput.limit_player,
		};
		if(await confirm("Xác nhận đặt sân ?")) {
			const response = PickCourtApi.add(param).then(
				() => {
					toggle();
					setLoading(false);
					window.location.reload();
				}, (error) => {
	                const resMessage =
	                    (error.response && error.response.message) || error.message || error.toString();
	                setLoading(false);
	                setMessage(resMessage);
	            }
			);
		}
	}
	function showListDate() {
		return timeframeList.map((dataTimeFrame, idx) => {
			return (
				<Row key={idx} className="item-date" onClick={() => GetTimeFramePick(dataTimeFrame.date, dataTimeFrame.limit)}>
					<Col xs="10" className="item-timeframe">
						<div>Chọn sân</div>
						<div>Giờ trống: {showListLimit(dataTimeFrame.limit)}</div>
						<div>
							Giờ có đội tìm đối thủ:
						</div>
					</Col>
					<Col className="show-date">
						<Col>{dataTimeFrame.date}</Col>
					</Col>
					<FontAwesomeIcon className="icon-right" icon={['fas', 'angle-right']} fixedWidth />
				</Row>
			);
		})
	}
	function GetTimeFramePick(date, limit) {
		getCourtPlayer(limit);
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
	function getCourtPlayer(limit) {
		let arrCourt = [];
		if(limit.length !== 0) {
	  		for (let str in limit) {
		        arrCourt.push({
		          	value: limit[str]["limit"],
		          	label: limit[str]["limit"]
		        });
	      	}
	      	setOptionCourt(arrCourt);
	      	setTimeFrameFree(limit);
	  	}
  	}
  	// handle list time frame show modal
  	useEffect(() => {
  		if(userInput.limit_player != '') {
			if(timeFrameFreeList != null) {
		  		timeFrameFreeList.map((free, idx) => {
		  			if(free.limit == userInput.limit_player) {
		  				setTimeFrameShow(free.time_frame);
		  			}
		  		})
		  	}
  		} else {
  			setTimeFrameShow([]);
  		}
  	},[userInput.limit_player]);
  	
  	let listOptionCourt;
	if (optionCourt === null) {
		listOptionCourt = <li>Đang tải...</li>;
	} else if (optionCourt.length === 0) {
		listOptionCourt = <li>Không có thông tin</li>;
	} else {
		listOptionCourt = optionCourt.map((arrCourt, idx) => {
		  	return <option key={idx} value={arrCourt.value}>Sân {arrCourt.label} người</option>;
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
  	// handle modal
  	function closeModalPick() {
  		handleClose();
  		togglePick();
  	}
  	function handleClose() {
  		setUserInput({
  			limit_player: ''
  		});
  	}
  	let ListTimeFramePick;
  	// console.log(timeFrameShow);
  	if (timeFrameShow === null) {
		ListTimeFramePick = <li>Đang tải...</li>;
	} else if (timeFrameShow.length === 0) {
		ListTimeFramePick = <li>Không có thông tin</li>;
	} else {
		ListTimeFramePick = timeFrameShow.map((timeFrame, idx) => {
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
		});
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
	      	<Modal isOpen={modalPick} toggle={togglePick} onClosed={handleClose}>
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
					              	onChange={handleChange}
					              	>
					              	<option value="">Lựa chọn loại sân</option>
					              	{listOptionCourt}
				              	</Input>
				          	</InputGroup>
			          	</FormGroup>
			        	<div className="list-timeframe-pick">
			        		{ ListTimeFramePick }
			        	</div>
		        	</div>
		        </ModalBody>
		        <ModalFooter>
		          	<Button color="secondary" onClick={closeModalPick}>
			            Hủy
		          	</Button>
		        </ModalFooter>
	      	</Modal>
		</div>
	);
}

export default PickCourt;