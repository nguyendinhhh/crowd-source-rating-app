import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import Navbar from '../components/Navbar';

const Login = (props) => {

    const [sjsuid, setSjsuid] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");

    const login = (event) => {
        event.preventDefault();
        axios
            .post(
                "http://localhost:8000/api/users/login",
                {
                    sjsuid: sjsuid,
                    password: password,
                },
                {
                    withCredentials: true,
                },
            )
            .then((res) => {
                console.log(res,);
                console.log(res.data);
                navigate("/");
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrors(err.response.data.message);
            });
    }

    return(
        <div>
            <Navbar />
            <Link to={"/register"}>No account? Register now!</Link>
            <h2>Login</h2>
            <p>{errors ? errors : ""}</p>
            <form onSubmit={login}>
                <div>
                    <label>SJSU ID</label>
                    <input
                        type="text"
                        name="sjsuid"
                        value={sjsuid}
                        onChange={(e) => setSjsuid(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button>Sign In</button>
            </form>
        </div>
    )
}
export default Login