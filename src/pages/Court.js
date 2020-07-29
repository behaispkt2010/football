import React, {useState, useEffect} from "react";
import CourtApi from "../api/CourtApi";
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

function Court() {
	const [CourtList, setCourtList] = useState([]);
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
      	field: "address",
      	method: "isEmpty",
      	validWhen: false,
      	message: "Vui lòng nhập địa chỉ"
    }];
    
    const initialUserInput = {
        name: "",
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
			'name' : userInput.name
		};
		const response = CourtApi.add(param).then(
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
    function updateData() {
    	const param = {
    		'id': userInput.id, 
			'name' : userInput.name
		};
		const response = CourtApi.update(param).then(
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
    const DeleteData = async data => {
    	if(await confirm("Bạn có chắc muốn xóa ?")) {
    		const response = CourtApi.delete(data.id).then(
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
    function showModal() {
    	setHeader('Thêm mới sân');
    	toggle();
    }
    function UpdateItem(data) {
    	setUserInput({
	      	id: data.id,
	      	name: data.name
	    })
    	setHeader('Cập nhật sân');
    	toggle();
    }
	useEffect(() => {
		const fetchCourtList = async() => {
			try {
				const param = {
					'_page' : 1
				};
				const response = await CourtApi.getAll(param);
				// console.log(response);
				setCourtList(response.data);
			} catch (errordata) { 
				console.log("Fail to fetch data: ", errordata);
			}
		}
		fetchCourtList();
	}, []);
	let arrFieldShow = [
	    { name: "Tên sân" },
  	];
	// console.log(CourtList);
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
				              	<InputGroupText>Địa chỉ</InputGroupText>
				            </InputGroupAddon>
				            <Input
				              	value={userInput.address}
				              	className={`input ${errors.address && "is-danger"}`}
				              	name="address"
				              	onChange={handleChange}
				            />
			          	</InputGroup>
			          	{errors.address && <p className="help is-danger">{errors.address}</p>}
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