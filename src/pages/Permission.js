import React, {useState, useEffect} from "react";
import PermissionApi from "../api/PermissionApi";
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

function Permission() {
	const [permsList, setPermsList] = useState([]);
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
		const response = PermissionApi.add(param).then(
			() => {
				toggle();
				setLoading(false);
				// window.location.reload();
				fetchPermsList();
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
			'name' : userInput.name
		};
		const response = PermissionApi.update(param).then(
    		() => {
    			toggle();
    			setLoading(false);
    			// window.location.reload();
    			fetchPermsList();
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
    		const response = PermissionApi.delete(data.id).then(
	    		() => {
	    			// toggle();
	    			setLoading(false);
	    			// window.location.reload();
	    			fetchPermsList();
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
	      	name: data.name
	    })
    	setHeader('Cập nhật quyền');
    	toggle();
    }
    const fetchPermsList = async() => {
		try {
			const param = {
				'_page' : 1
			};
			const response = await PermissionApi.getAll(param);
			// console.log(response);
			setPermsList(response.data);
		} catch (errordata) { 
			console.log("Fail to fetch data: ", errordata);
		}
	}
	function handleClose() {
  		setUserInput(initialUserInput);
  	}
	useEffect(() => {
		fetchPermsList();
	}, []);
	let arrFieldShow = [
	    { name: "Tên phân quyền" },
  	];
	// console.log(permsList);
	return (
	    <Col xs="12">
	      	<Row>
		        <Col xs="12">
		          <h1>Danh sách quyền</h1>
		        </Col>
	      	</Row>
	      	<Row>
		        <Col xs="12" className="d-flex pL-20 justify-content-start">
		          	<Button color="primary" size="lg" active onClick={showModal}>
		            	Tạo mới
		          	</Button>
		        </Col>
	      	</Row>
	      	{permsList !== null && ( 
	        <TablesComponent
	          	list={permsList}
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
export default Permission;