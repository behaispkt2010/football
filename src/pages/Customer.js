import React, {useState, useEffect} from "react";
import UserApi from "../api/UserApi";
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

function Customer() {
	const [userList, setUserList] = useState([]);
	const [modal, setModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState(false);
	const [headerlabel, setHeader] = useState("Thêm mới quyền");
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
      	field: "phone",
      	method: "isEmpty",
      	validWhen: false,
      	message: "Vui lòng nhập số điện thoại"
    }];
    
    const initialUserInput = {
        name: "",
        phone: "",
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
			'phone' : userInput.phone
		};
		const response = UserApi.add(param).then(
			() => {
				toggle();
				setLoading(false);
				// window.location.reload();
				fetchuserList();
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
			'phone' : userInput.phone
		};
		const response = UserApi.update(param).then(
    		() => {
    			toggle();
    			setLoading(false);
    			// window.location.reload();
    			fetchuserList();
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
    		const response = UserApi.delete(data.id).then(
	    		() => {
	    			// toggle();
	    			setLoading(false);
	    			// window.location.reload();
	    			fetchuserList();
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
    	setHeader('Thêm mới quyền');
    	toggle();
    }
    function UpdateItem(data) {
    	setUserInput({
	      	id: data.id,
	      	name: data.name,
	      	phone: data.phone
	    })
    	setHeader('Cập nhật thông tin khách hàng');
    	toggle();
    }
    const fetchuserList = async() => {
		try {
			const param = {
				'_page' : 1
			};
			const response = await UserApi.getAll(param);
			// console.log(response);
			setUserList(response.data);
		} catch (errordata) { 
			console.log("Fail to fetch data: ", errordata);
		}
	}
	function handleClose() {
  		setUserInput(initialUserInput);
  	}
	useEffect(() => {
		fetchuserList();
	}, []);
	let arrFieldShow = [
	    { name: "Tên khách hàng" },
	    { phone: "Số điện thoại" },
  	];
	// console.log(userList);
	return (
	    <Col xs="12">
	      	<Row>
		        <Col xs="12">
		          <h1>Danh sách khách hàng</h1>
		        </Col>
	      	</Row>
	      	<Row>
		        <Col xs="12" className="d-flex pL-20 justify-content-start">
		          	<Button color="primary" size="lg" active onClick={showModal}>
		            	Tạo mới
		          	</Button>
		        </Col>
	      	</Row>
	      	{userList !== null && ( 
	        <TablesComponent
	          	list={userList}
	          	dataField={arrFieldShow}
	          	actionUpdateTables={UpdateItem}
	          	actionDeleteTable={DeleteData}
	        /> 
	      	)}
	      	<Modal isOpen={modal} toggle={toggle} onClosed={handleClose}>
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
				              	<InputGroupText>Số điện thoại</InputGroupText>
				            </InputGroupAddon>
				            <Input
				              	value={userInput.phone}
				              	className={`input ${errors.phone && "is-danger"}`}
				              	name="phone"
				              	onChange={handleChange}
				            />
			          	</InputGroup>
			          	{errors.phone && <p className="help is-danger">{errors.phone}</p>}
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
export default Customer;