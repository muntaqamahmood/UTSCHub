import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken, setUserData, setUserSession } from "../Utils/Common";
import './signupLogin.css';
import { Row, Col, Container } from 'react-bootstrap';
import AboutUs from "../AboutUs";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleLogin = () => {

        const body = { email: username, password: password };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            }
        };

        axios.post('http://localhost:8000/api/auth',  body, axiosConfig).then(response => {

            setLoading(false);
            setUserSession(response.data.token);
            let axiosConfig = {
                headers:{'x-auth-token': getToken()}
            };

            axios.get('http://localhost:8000/api/auth',axiosConfig).then(response =>{

                console.log(response);
                setLoading(false);

                setUserData(response.data.name, response.data.email, response.data.profilePic, response.data.coverImg);

                navigate('/dashboard');
            }).catch(error => {
                setUserData("{{Error loading user name}}", "{{Error loading email address}}");
                console.error('error >>>', error);
                console.error("Can't load user data.")
                navigate('/dashboard');
            });

        }).catch(error => {
            setLoading(false);
            console.error('error >>>', error);
            if(error.response.status === 401 || error.response.status === 400){
                if(error.response.data.message){
                    setError(error.response.data.message);
                }else{
                    const errorList = error.response.data.errors;
                    let errorMsg = "";
                    for(let error of errorList){
                        errorMsg = errorMsg.concat(error.msg + '\n');
                    }
                    setError(errorMsg);
                }
            }
            else {
                setError("Something went wrong. Please try again later.");
            }
        });
    }

    const handleSignup = () => {
        navigate('/signup');
    }

    return (
        <div className="App">
            <Container>
                <Row>
                    <Col>
                        <div className="formContainer">
                            <div className="form">
                                <h1>Login</h1>
                                <hr />
                                <div className="uiForm">
                                    <div className="formField">
                                        <label>UofT Email</label>
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="formField">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)} />
                                    </div>
                                    <br />
                                    {error && <pre className="error">{error}</pre>}
                                    <input
                                        className="button"
                                        type="button"
                                        value={loading ? "Loading..." : "Log In"}
                                        disabled={loading}
                                        onClick={handleLogin} />
                                    <input
                                        className="button"
                                        type="button"
                                        value={loading ? "Loading..." : "Sign Up"}
                                        disabled={loading}
                                        onClick={handleSignup}
                                    />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <AboutUs />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login;