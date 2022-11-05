import { useState } from "react";
import axios from 'axios';
import '../Styles/signupLogin.css';
import AboutUs from "./AboutUs";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap';

import {
    validatePassword,
} from '../Utils/Common';

function Signup() {

    const initialValues = { username: "", mailAddress: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState([]);
    const navigate = useNavigate();
    const errors = {};

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = { name: formValues.username, email: formValues.mailAddress, password: formValues.password };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            }
        };
        axios.post('http://localhost:8000/api/users',  body, axiosConfig)
        .then(res => {
            console.log(res);
            navigate('/');
        }).catch(error => {
            const errorMessage = error.response.data.message;
            console.log(errorMessage);
            if (errorMessage != null) {
                errors.database = errorMessage;
                setFormErrors(errors);
            }
            else {
                setFormErrors(validate(formValues));
            }
            console.error(error);
        })
    }

    const validate = (values) => {
        const regex = /^[a-zA-Z0-9_.+-]+@mail.utoronto.ca$/;
        if(!values.username){
            errors.username = "Please enter the username";
        }
        if(!values.mailAddress){
            errors.mailAddress = "Please enter your email address";
        }
        else if (!regex.test(values.mailAddress)){
            errors.mailAddress = "Please enter the valid mail address";
        }

        if(!values.password){
            errors.password = "Please enter your password";
        }
        else if(values.password.length < 5){
            errors.password = "Please enter the longer password";
            console.log(errors.password);
        }
        return errors;
    }
  return (
    <div className="App">
    <Container fluid>
        <Row>
            <Col className="center-block">
                <div className="formContainer">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <h1>Signup Form</h1>
                        <hr />
                        <div className="uiForm">
                            <div className="formField">
                                <label>Username</label>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <p className="errorMsg">{formErrors.username}</p>
                            <div className="formField">
                                <label>Mail Address</label>
                                <input
                                    type="text"
                                    placeholder="Mail Address"
                                    name="mailAddress"
                                    onChange={(e) => handleChange(e)} />
                            </div>
                            <p className="errorMsg">{formErrors.mailAddress}</p>
                            <div className="formField">
                                <label>Password</label>
                                <input type="text"
                                    placeholder="Password"
                                    name="password"
                                    onChange={(e) => handleChange(e)} />
                            </div>
                            <p className="errorMsg">{formErrors.password}</p>
                            <button className="submitButton">Create Your Account</button>
                            <p className="errorMsg">{formErrors.database}</p>
                        </div>
                    </form>
                </div>
            </Col>
            <Col>
                <AboutUs />
            </Col>
        </Row>
    </Container>
    </div>
  );
}

export default Signup;
