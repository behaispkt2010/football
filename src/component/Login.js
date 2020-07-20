import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import AuthUserApi from "../api/AuthUserApi";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const phone = useFormInput('');
    const password = useFormInput('');
    const [message, setMessage] = useState(null);
    const history = useHistory();
    const handleLogin = async() => {
        try {
            setLoading(true);
            const param = {
                phone: phone.value,
                password: password.value
            };
            const response = await AuthUserApi.login(param).then(
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
    };
    return (
        <div>
        Login<br /><br />
            <div>
                Username<br />
                <input type="text" {...phone} autoComplete="new-password" />
            </div>
            <div style={{ marginTop: 10 }}>
                Password<br />
                <input type="password" {...password} autoComplete="new-password" />
            </div>
            <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /> <br />
        </div>
    );
};
const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

export default Login;