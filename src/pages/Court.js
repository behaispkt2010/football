import React, {useState, useEffect} from "react";
import CourtApi from "../api/CourtApi";
import LocationCourtApi from "../api/LocationCourtApi";
import TablesComponent from "../component/TablesComponent";
import {confirm} from "../component/Confirmation";
import { Container, Row, Col, Button, Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  FormGroup } from "reactstrap";
import useForm from "../component/useForm";
import {getStatus} from "../Utils/Common";

function Court() {
	const [CourtList, setCourtList] = useState([]);
	const [locationCourtList, setLocationCourtList] = useState([]);
	const [modal, setModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState(false);
	const [headerlabel, setHeader] = useState("Thêm mới sân");
	const toggle = () => {
		setModal(!modal);
	}
	const rulesValidate = [ 
    {
      	field: "name",
      	method: "isEmpty",
      	validWhen: false,
      	message: "Vui lòng nhập tên"
    },
    {
      	field: "idlocation",
      	method: "isEmpty",
      	validWhen: false,
      	message: "Vui lòng chọn bãi"
    },
    {
      	field: "limit_player",
      	method: "isEmpty",
      	validWhen: false,
      	message: "Vui lòng nhập số lượng người"
    }];
    
    const initialUserInput = {
        name: "",
        idlocation: "",
        isactive: "",
        limit_player: "",
        id: ""
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
    	let id = userInput.id;
    	if(id != '') {
    		updateData()
    	} else {
    		addNewData();
    	}
    }
    function addNewData() {
    	const param = {
			'name' : userInput.name,
			'idlocation': userInput.idlocation,
	        'isactive': (userInput.isactive[0] != 1) ? 0 : 1,
	        'limit_player': userInput.limit_player,
		};
		const response = CourtApi.add(param).then(
			() => {
				toggle();
				setLoading(false);
				// window.location.reload();
				fetchCourtList();
				setUserInput([]);
			}, (error) => {
                const resMessage =
                    (error.response && error.response.message) || error.message || error.toString();
                setLoading(false);
                setMessage(resMessage);
            }
		);
    }
    function updateData() {
    	const param = {
    		'id': userInput.id, 
			'name' : userInput.name,
			'idlocation': userInput.idlocation,
	        'isactive': (userInput.isactive[0] != 1) ? 0 : 1,
	        'limit_player': userInput.limit_player,
		};
		// setLoading(false);
		// console.log(param);
		const response = CourtApi.update(param).then(
    		() => {
    			toggle();
    			setLoading(false);
    			// window.location.reload();
    			fetchCourtList();
				setUserInput([]);
    		}, (error) => {
                const resMessage =
                    (error.response && error.response.message) || error.message || error.toString();
                setLoading(false);
                setMessage(resMessage);
            }
        );
    }
    const DeleteData = async data => {
    	if(await confirm("Bạn có chắc muốn xóa ?")) {
    		const response = CourtApi.delete(data.id).then(
	    		() => {
	    			// toggle();
	    			setLoading(false);
	    			// window.location.reload();
	    			fetchCourtList();
	    		}, (error) => {
	                const resMessage =
	                    (error.response && error.response.message) || error.message || error.toString();
	                setLoading(false);
	                setMessage(resMessage);
	            }
			);
    	}
    }
    function showModal() {
    	setHeader('Thêm mới sân');
    	toggle();
    }
    function UpdateItem(data) {
    	setUserInput({
	      	id: data.id,
	      	name: data.name,
	      	idlocation: data.idlocation,
	        isactive: (data.isactive) ? [data.isactive] : [],
	        limit_player: data.limit_player+'',
	    })
    	setHeader('Cập nhật sân');
    	toggle();
    }
    const fetchCourtList = async() => {
		try {
			const param = {
				'_page' : 1
			};
			const response = await CourtApi.getAll(param);
			// console.log(response.data);
			setCourtList(response.data);
		} catch (errordata) { 
			console.log("Fail to fetch data: ", errordata);
		}
	}
	useEffect(() => {
		fetchCourtList();
	}, []);
	useEffect(() => {
		const fetchLocationCourtList = async() => {
			try {
				const param = {
					'_page' : 1
				};
				const response = await LocationCourtApi.getAll(param);
				// console.log(response);
				setLocationCourtList(response.data);
			} catch (errordata) { 
				console.log("Fail to fetch data: ", errordata);
			}
		}
		fetchLocationCourtList();
	}, []);
	let arrFieldShow = [
	    { name: "Tên sân" },
	    { limit_player: "Số người" },
	    { isactive: "Trạng thái" },
  	];
  	function getLocationCourt() {
  		return locationCourtList.map((dataLocation, idx) => {
  			return (
  				<option key={idx} value={dataLocation.id}>{dataLocation.name}</option>
			)
  		});
  	}
	return (
	    <Col xs="12">
	      	<Row>
		        <Col xs="12">
		          <h1>Danh sách sân</h1>
		        </Col>
	      	</Row>
	      	<Row>
		        <Col xs="12" className="d-flex pL-20 justify-content-start">
		          	<Button color="primary" size="lg" active onClick={showModal}>
		            	Tạo mới
		          	</Button>
		        </Col>
	      	</Row>
	      	{CourtList !== null && ( 
	        <TablesComponent
	          	list={CourtList}
	          	dataField={arrFieldShow}
	          	actionUpdateTables={UpdateItem}
	          	actionDeleteTable={DeleteData}
	          	showText={getStatus}
	        />
	      	)}
	      	<Modal isOpen={modal} toggle={toggle}>
		        <ModalHeader toggle={toggle}>{headerlabel}</ModalHeader>
		        <ModalBody>
		        	<FormGroup>
			          	<InputGroup>
				            <InputGroupAddon addonType="prepend">
				              	<InputGroupText>Tên</InputGroupText>
				            </InputGroupAddon>
				            <Input
				              	value={userInput.name}
				              	className={`input ${errors.name && "is-danger"}`}
				              	name="name"
				              	onChange={handleChange}
				            />
			          	</InputGroup>
			          	{errors.name && <p className="help is-danger">{errors.name}</p>}
		          	</FormGroup>
		        	<FormGroup>
			          	<InputGroup>
				            <InputGroupAddon addonType="prepend">
				              	<InputGroupText>Bãi</InputGroupText>
				            </InputGroupAddon>
				            <Input
				            	type="select"
				              	value={userInput.idlocation}
				              	className={`input ${errors.idlocation && "is-danger"}`}
				              	name="idlocation"
				              	onChange={handleChange}>
				              	<option value="">Lựa chọn bãi</option>
				              	{getLocationCourt()}
			              	</Input>
			          	</InputGroup>
			          	{errors.idlocation && <p className="help is-danger">{errors.idlocation}</p>}
		          	</FormGroup>
		        	<FormGroup>
			          	<InputGroup>
				            <InputGroupAddon addonType="prepend">
				              	<InputGroupText>Số người</InputGroupText>
				            </InputGroupAddon>
				            <Input
				              	value={userInput.limit_player}
				              	className={`input ${errors.limit_player && "is-danger"}`}
				              	name="limit_player"
				              	onChange={handleChange}>
			              	</Input>
			          	</InputGroup>
			          	{errors.limit_player && <p className="help is-danger">{errors.limit_player}</p>}
		          	</FormGroup>
		          	<FormGroup>
			          	<InputGroup>
					        <InputGroupAddon addonType="prepend">
					          	<InputGroupText>Hoạt động</InputGroupText>
					        </InputGroupAddon>{" "}
					        <Input addon type="checkbox" name="isactive" defaultChecked={userInput.isactive[0] ? true : false} className="form-control" value='1' onChange={handleChange}/>
				      	</InputGroup>
			      	</FormGroup>
		        </ModalBody>
		        <ModalFooter>
		          	<Button color="primary" onClick={handleSubmit} className="btnAddNew"disabled={loading}>{loading ? 'Loading...' : headerlabel}
		          	</Button>{" "}
		          	<Button color="secondary" onClick={toggle}>
			            Hủy
		          	</Button>
		        </ModalFooter>
	      	</Modal>
      	</Col>
      	
  	);
}
export default Court;