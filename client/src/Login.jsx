import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken, setUserData, setUserSession } from "./Utils/Common";

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

        axios.post('http://localhost:8000/api/auth',  body, axiosConfig)
        
        .then(response => {

            setLoading(false);
            setUserSession(response.data.token);
            let axiosConfig = {
                headers:{'x-auth-token':getToken(),}
            };

            axios.get('http://localhost:8000/api/auth',axiosConfig).then(response =>{

                console.log(response);
               setLoading(false);
                
               setUserData( ,response.data.email)
            })
            
        
           
            navigate('/dashboard');

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
        <div>
            Login <br /><br />
            <div>
                UofT Email<br />
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            <div>
                Password<br />
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div><br />
            {error && <pre className="error">{error}</pre>}
            <input
                type="button"
                value={loading ? "Loading..." : "Log In"}
                disabled={loading}
                onClick={handleLogin}
            />
            <input
                type="button"
                value={loading ? "Loading..." : "Sign Up"}
                disabled={loading}
                onClick={handleSignup}
            />
        </div>
    )
}

export default Login;