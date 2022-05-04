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

    return (
        <div className="wrapper">
            <div className='bg'></div>
            <Navbar />
            <div className="section-shift">
                <h2>Login</h2>
                <b style={{color:"red"}}>{errors ? errors : ""}</b>
                <form onSubmit={login}>
                    <div>
                        <table>
                            <tr>
                                <td><label>SJSU ID</label></td>
                                <td>
                                    <input
                                        type="text"
                                        name="sjsuid"
                                        value={sjsuid}
                                        onChange={(e) => setSjsuid(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Password</label></td>
                                <td>
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </td>
                            </tr>
                        </table>
                    </div>

                    <button>Sign In</button>
                </form>
                <br/>
                <Link to={"/security"}>Forget Password</Link>
                <br/>
                <Link to={"/register"}>No account? Register now!</Link>
            </div>
        </div>
    )
}
export default Login