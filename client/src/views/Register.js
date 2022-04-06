import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import Navbar from '../components/Navbar';

const Register = (props) => {

    const [errors, setErrors] = useState("");
    const [confirmReg, setConfirmReg] = useState("");
    const [user, setUser] = useState({
        sjsuid: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };

    const register = (event) => {
        event.preventDefault();

        axios.post("http://localhost:8000/api/users/register", user)
            .then((res) => {
                console.log(res.data);
                setUser({
                    sjsuid: "",
                    password: "",
                    confirmPassword: "",
                });
                setConfirmReg(
                    "Thank you for Registering, you can now log in!",
                );
                setErrors({});
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
                navigate('/register');
            })
    }

    return (
        <div className="wrapper">
            <Navbar />
            <div className="section-shift">
                {confirmReg ? <h4 style={{ color: "green" }}>{confirmReg}</h4> : null}
                <h2>Register</h2>
                <form onSubmit={register}>
                    <div>
                        <table>
                            <tr>
                                <td><label>SJSU ID</label></td>
                                <td>
                                    <input
                                        type="text"
                                        name="sjsuid"
                                        value={user.sjsuid}
                                        onChange={handleChange}
                                    />
                                    {errors.sjsuid ? (
                                        <span className="error-text">
                                            {errors.sjsuid.message}
                                        </span>
                                    ) : null}
                                </td>
                            </tr>
                            <tr>
                                <td><label>Password</label></td>
                                <td>
                                    <input
                                        type="password"
                                        name="password"
                                        value={user.password}
                                        onChange={handleChange}
                                    />
                                    {errors.password ? (
                                        <span>
                                            {errors.password.message}
                                        </span>
                                    ) : null}
                                </td>
                            </tr>
                            <tr>
                                <td><label>Confirm Password</label></td>
                                <td>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={user.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    {errors.confirmPassword ? (
                                        <span>
                                            {errors.confirmPassword.message}
                                        </span>
                                    ) : null}

                                </td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <button>Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Register;