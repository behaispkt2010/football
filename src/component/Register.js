import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import AuthUserApi from "../api/AuthUserApi";

const Register = () => {
    const phone = useFormInput('');
    const password = useFormInput('');
    const email = useFormInput('');
    const name = useFormInput('');
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const handleRegister = e => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        const param = {
            phone: phone.value,
            email: email.value,
            name: name.value,
            password: password.value
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
    };
    return (
        <div>
        Register<br /><br />
            <div>
                Full name<br />
                <input type="text" {...name} autoComplete="on" />
            </div>
            <div>
                Username<br />
                <input type="text" {...phone} autoComplete="off" />
            </div>
            <div style={{ marginTop: 10 }}>
                Password<br />
                <input type="password" {...password} autoComplete="new-password" />
            </div>
            <div style={{ marginTop: 10 }}>
                Email<br />
                <input type="text" {...email} autoComplete="on" />
            </div>
            <input type="button" value={loading ? 'Loading...' : 'Register'} onClick={handleRegister} disabled={loading} /> <br />
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
export default Register;