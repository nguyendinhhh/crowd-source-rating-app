import { React, useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import Navbar from '../components/Navbar';

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
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
            </select>
        </div>
    );
};

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
    
    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };

    const register = (event) => {
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
                "Thank you for registering, you can now log in!",
            );
            setErrors({}); 
        })
        .catch((err)=>{
            console.log("Oops, something went wrong!"); //console.log(err); avoid error details breach
            // setErrors(err.response.data.errors);
            navigate('/register');
        })
    }

    return(
        <div className='wrapper'>
            <div className='bg'></div>
            <Navbar />
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
                            <b style={{color:"red"}} className="error-text">
                                {errors.sjsuid.message}
                            </b>
                        ) : null}
                    </div>
                    
                    <div className='userInput'>
                        <label>Security Question</label>
                        <label>The security question will be used for password recovery</label>
                            <Dropdown
                                name="securityQuestion"
                                options={questions}
                                value={user.securityQuestion}
                                onChange={handleChange}
                            />
                            {errors.securityQuestion && (
                            <b style={{color:"red"}} className="error-text">
                                {errors.securityQuestion.message}
                            </b>)}
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
                            <b style={{color:"red"}} className="error-text">
                                {errors.securityAnswer.message}
                            </b>
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
                            <b style={{color:"red"}}>
                                {errors.password.message}
                            </b>
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
                            <b style={{color:"red"}}>
                                {errors.confirmPassword.message}
                            </b>
                        )}
                        <div>
                            <button>Register</button>
                        </div>
                    </div>
                    
                </form>
            </div>
            {confirmReg && <h3 style={{ color: "darkgreen", marginLeft:"3%", marginTop:"10px" }}>{confirmReg}</h3>}
        </div>    
    )
}
export default Register;