import react, { useState } from "react";
import { Link } from "react-router-dom";

function SignInPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const submitHandler = (e) => {
        var errorsTemp = [];
        if (username.trim().length === 0) {
            errorsTemp = [...errorsTemp, "Username is required"];
            e.preventDefault();
        }
        if (email.trim().length === 0) {
            errorsTemp = [...errorsTemp, "Please enter your email"];
            e.preventDefault();
        }
        if (password.trim().length === 0) {
            errorsTemp = [...errorsTemp, "You must enter your password"];
            e.preventDefault();
        }
        setErrors(errorsTemp);
    };
    return (
        <form id="form">
            <div id="centermargin">
                <h4>
                    Please Sign In:
                </h4>
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
                <h5>
                    You will be signed in as: {username}
                </h5>
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

export default SignInPage;