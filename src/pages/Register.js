import React, {useState, useReducer, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import AuthUserApi from "../api/AuthUserApi";

import { FormGroup, Label, Input, Col, Row, InputGroup, InputGroupAddon, InputGroupText, Button } from "reactstrap";

import useForm from "../component/useForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Register = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const rulesValidate = [
    {
      field: "phone",
      method: "isEmpty",
      validWhen: false,
      message: "Vui lòng nhập Số điện thoại"
    }, 
    {
      field: "password",
      method: "isEmpty",
      validWhen: false,
      message: "Vui lòng nhập Mật khẩu"
    }, 
    {
      field: "email",
      method: "isEmail",
      validWhen: true,
      message: "Vui lòng đúng định dạng mail"
    }];
    
    const initialUserInput = {
        phone: "",
        password: "",
        name: "",
        email: ""
    };
    const {
        userInput,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(register, rulesValidate, initialUserInput);

    function register() {
        try {
            setLoading(true);
            const param = {
                phone: userInput.phone,
                email: userInput.email,
                name: userInput.name,
                password: userInput.password
            };
            const response = AuthUserApi.register(param).then(
                () => {
                    history.push('/');
                    window.location.reload();
                }, (error) => {
                    const resMessage =
                        (error.response && error.response.message) || error.message || error.toString();
                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } catch (error) {
            console.log("Fail to register: ", error);
        }
    }
    
    return (
        <div className="box-register">
            <h2 className="cl-green">Đăng ký</h2>
            <Col sm="12" md={{ size: 4, offset: 4 }}>
                <div className="form-group">
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <FontAwesomeIcon icon={['fas', 'phone-alt']} fixedWidth />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        value={userInput.phone}
                        className={`input ${errors.phone && "is-danger"}`}
                        name="phone"
                        onChange={handleChange}
                        placeholder="Số điện thoại"
                    />   
                </InputGroup>
                {errors.phone && <p className="help is-danger">{errors.phone}</p>}
                </div>
                <div className="form-group">
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={['fas', 'lock']} fixedWidth /></InputGroupText>
                    </InputGroupAddon>
                    <Input
                        value={userInput.password}
                        className={`input ${errors.password && "is-danger"}`}
                        name="password"
                        type="password"
                        onChange={handleChange}
                        placeholder="Mật khẩu"
                    />
                </InputGroup>
                {errors.password && <p className="help is-danger">{errors.password}</p>}
                </div>
                <div className="form-group">
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={['fas', 'user-tie']} fixedWidth /></InputGroupText>
                    </InputGroupAddon>
                    <Input
                        value={userInput.name}
                        className={`input ${errors.name && "is-danger"}`}
                        name="name"
                        onChange={handleChange}
                        placeholder="Họ và tên"
                    />
                </InputGroup>
                </div>
                <div className="form-group">
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={['fas', 'envelope']} fixedWidth /></InputGroupText>
                    </InputGroupAddon>
                    <Input
                        value={userInput.email}
                        className={`input ${errors.email && "is-danger"}`}
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                    />
                </InputGroup>
                {errors.email && <p className="help is-danger">{errors.email}</p>}
                </div>
                <Button color="primary" onClick={handleSubmit} disabled={loading}>{loading ? 'Loading...' : 'Đăng ký'}</Button>
                
            </Col>
        </div>
    );
};

export default Register;