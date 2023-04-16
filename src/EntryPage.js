import { Link } from "react-router-dom";

function EntryPage() {
    return (
        <div id="form">
            <div>
                <h3>
                    Would you like to log in to an existing account or sign up?
                </h3>
            </div>
            <div id="centermargin">
                <Link to="/login">
                    <button>Log In</button>
                </Link>
            </div>
            <div id="centermargin">
                <Link to="/signup">
                    <button>Sign Up</button>
                </Link>
            </div>
        </div>
    );
}

export default EntryPage;