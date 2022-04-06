import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import Navbar from '../components/Navbar';

const Register = (props) => {

    const [errors, setErrors] = useState("");
    const [confirmReg, setConfirmReg] = useState("");
    const [user, setUser] = useState({
        sjsuid: "",
        securityQuestion: "Which is your favorite class?", // default selected val
        securityAnswer: "",
        password: "",
        confirmPassword: "",
    });

    const questions = [
        { label: "Which is your favorite class?", value: "Which is your favorite class?" },
        { label: "In which city were you born?", value: "In which city were you born?" },
        { label: "What's the name of your first pet?", value: "What's the name of your first pet?" },
        { label: "What's your childhood best friend's name?", value: "What's your childhood best friend's name?"},
    ];

    // dropdown component, this can probably be useable 
    const Dropdown = ({ name, value, options, onChange }) => {
        return (
            <div className="menu">
                <select name={name} value={value} onChange={onChange}>
                {options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                ))}
                </select>
            </div>
        );
    };

    
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
                securityQuestion: "Which is your favorite class?",
                securityAnswer: "",
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
        <div className='wrapper'>
            <Navbar />
            {confirmReg && <h4 style={{ color: "green" }}>{confirmReg}</h4>}
            <div className="sec-wrapper">
            <h1>Account Registration</h1>
            <form onSubmit={register}>
                <div className='userInput'>
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
                <div className='userInput'>
                    <label>Security Question</label>
                        <Dropdown
                            name="securityQuestion"
                            options={questions}
                            value={user.securityQuestion}
                            onChange={handleChange}
                        />
                        {errors.securityQuestion && (
                        <span className="error-text">
                            {errors.securityQuestion.message}
                        </span>)}
                </div>
                <div className='userInput'>
                    <label>Security Answer</label>
                    <input
                        type="text"
                        name="securityAnswer"
                        value={user.securityAnswer}
                        onChange={handleChange}
                    />
                    {errors.securityAnswer && (
                        <span className="error-text">
                            {errors.securityAnswer.message}
                        </span>
                    )}
                </div>
                <div className='userInput'>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    {errors.password && (
                        <span>
                            {errors.password.message}
                        </span>
                    )}
                </div>
                <div className='userInput'>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                        <span>
                            {errors.confirmPassword.message}
                        </span>
                    )}
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