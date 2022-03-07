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

    const register = (event)=>{
        event.preventDefault();

        axios.post("http://localhost:8000/api/users/register", user)
        .then((res)=>{
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
        .catch((err)=>{
            console.log(err);
            setErrors(err.response.data.errors);
            navigate('/register');
        })
    }

    return(
        <div>
            <Navbar />
            {confirmReg ? <h4 style={{ color: "green" }}>{confirmReg}</h4> : null}
            <h1>Register</h1>
            <form onSubmit={register}>
                <div>
                    <label>SJSU ID</label>
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
                </div>
                <div>
                    <label>Password</label>
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
                </div>
                <div>
                    <label>Confirm Password</label>
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
                </div>
                <div>
                    <button>Register</button>
                </div>
            </form>

        </div>
    )
}
export default Register;