import React, {useState, useEffect} from "react";
import CompanyApi from "../api/CompanyApi";
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
  FormGroup,
  Label } from "reactstrap";
import useForm from "../component/useForm";
import {getStatus} from "../Utils/Common";

function Company() {
	const [companyList, setCompanyList] = useState([]);
	const [modal, setModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState(false);
	const [headerlabel, setHeader] = useState("Thêm mới doanh nghiệp");
	const toggle = () => {
		setModal(!modal);
	}
	const rulesValidate = [ 
    {
      	field: "name",
      	method: "isEmpty",
      	validWhen: false,
      	message: "Vui lòng nhập tên"
    }, {
      	field: "phone",
      	method: "isEmpty",
      	validWhen: false,
      	message: "Vui lòng nhập số điện thoại"
    }];
    
    const initialUserInput = {
        name: "",
        phone: "",
        note: "",
        id: "",
        isactive: []
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
			'phone': userInput.phone,
			'note': userInput.note,
			'isactive': userInput.isactive[0]
		};
		const response = CompanyApi.add(param).then(
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
			'name' : userInput.name,
			'phone': userInput.phone,
			'note': userInput.note,
			'isactive': userInput.isactive[0]
		};
		// console.log(param);
		// setLoading(false);
		const response = CompanyApi.update(param).then(
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
    		const response = CompanyApi.delete(data.id).then(
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
    	setHeader('Thêm mới doanh nghiệp');
    	toggle();
    }
    function UpdateItem(data) {
    	setUserInput({
	      	id: data.id,
	      	name: data.name,
			phone: data.phone,
			note: data.note,
			isactive: (data.isactive) ? [data.isactive] : []
	    });
    	setHeader('Cập nhật doanh nghiệp');
    	toggle();
    }
	useEffect(() => {
		const fetchCompanyList = async() => {
			try {
				const param = {
					'_page' : 1
				};
				const response = await CompanyApi.getAll(param);
				// console.log(response);
				setCompanyList(response.data);
			} catch (errordata) { 
				console.log("Fail to fetch data: ", errordata);
			}
		}
		fetchCompanyList();
	}, []);
	let arrFieldShow = [
	    { name: "Tên doanh nghiệp" },
	    { phone: "Số điện thoại" },
	    { isactive: "Trạng thái" },
  	];
	// console.log(companyList); 
	return (
	    <Col xs="12">
	      	<Row>
		        <Col xs="12">
		          <h1>Danh sách doanh nghiệp</h1>
		        </Col>
	      	</Row>
	      	<Row>
		        <Col xs="12" className="d-flex pL-20 justify-content-start">
		          	<Button color="primary" size="lg" active onClick={showModal}>
		            	Tạo mới
		          	</Button>
		        </Col>
	      	</Row>
	      	{companyList !== null && ( 
	        <TablesComponent
	          	list={companyList}
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
		        	<FormGroup>
			          	<InputGroup>
				            <InputGroupAddon addonType="prepend">
				              	<InputGroupText>Ghi chú</InputGroupText>
				            </InputGroupAddon>
				            <Input
				              	value={userInput.note}
				              	name="note"
				              	onChange={handleChange}
				            />
			          	</InputGroup>
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
export default Company;