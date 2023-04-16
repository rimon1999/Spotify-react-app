import react, { useState } from "react";
import { Link } from "react-router-dom";

function SignUpPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const submitHandler = (e) => {
        var errorsTemp = [];
        if (firstName.trim().length === 0) {
            errorsTemp = [...errorsTemp, "Your first name is required"];
            e.preventDefault();
        }
        if (lastName.trim().length === 0) {
            errorsTemp = [...errorsTemp, "Your last name is required"];
            e.preventDefault();
        }
        if (username.trim().length === 0) {
            errorsTemp = [...errorsTemp, "You must create a username"];
            e.preventDefault();
        }
        if (email.trim().length === 0) {
            errorsTemp = [...errorsTemp, "You must enter an email"];
            e.preventDefault();
        }
        if (password.trim().length === 0) {
            errorsTemp = [...errorsTemp, "You must create a password"];
            e.preventDefault();
        }
        setErrors(errorsTemp);
    };
    return (
        <form id="form">
            <div id="centermargin">
                <h4>
                    Please Create Your Account:
                </h4>
            </div>
            <div id="marginbottom">
                First Name:
                <input type="text" onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div id="marginbottom">
                Last Name:
                <input type="text" onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div id="marginbottom">
                Username:
                <input type="text" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div id="marginbottom">
                Email:
                <input type="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div id="marginbottom">
                Password:
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div id="centermargin">
                A new account will be created under: {username}
            </div>
            <div id="greencenter">
                {errors.map((x) => (
                    <div>{x}</div>
                ))}
            </div>
            <div id="centermargin">
                <Link to="/artistsearch">
                    <button onClick={submitHandler} id="centermargintop">Submit</button>
                </Link>
            </div>
        </form>
    );
}

export default SignUpPage;