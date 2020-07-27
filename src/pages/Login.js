import React, {useState, useReducer} from "react";
import { Link, useHistory } from "react-router-dom";
import AuthUserApi from "../api/AuthUserApi";

import { FormGroup, Label, Input, Col, Row, InputGroup, InputGroupAddon, InputGroupText, Button } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useForm from "../component/useForm";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const history = useHistory();
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
    } = useForm(login, rulesValidate, initialUserInput);

    function login() {
        try {
            setLoading(true);
            const param = {
                phone: userInput.phone,
                password: userInput.password
            };
            const response = AuthUserApi.login(param).then(
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
            console.log("Fail to login: ", error);
        }
    } 
    
    return (
        <div className="box-login">
            <h2 className="cl-green">Đăng nhập</h2>
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
                <Button color="primary" onClick={handleSubmit} disabled={loading}>{loading ? 'Loading...' : 'Đăng nhập'}</Button>
                
            </Col>
        </div>
    );
};

export default Login;