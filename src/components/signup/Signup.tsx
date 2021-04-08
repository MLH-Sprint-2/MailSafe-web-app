import React, { useState } from 'react';

import './Signup.css'

const Login: React.VFC<{ setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setIsLoggedIn }) => {

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!username || !password || !confirmPassword) {
            setErrorMessage("Username, password, and confirm password cannot be empty");
        }
        else if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
        }
        else {
            try {
                setErrorMessage("");
                setLoading(true);

                // send request

                setIsLoggedIn(true);
            } catch (error) {
                if (error?.response?.data?.message) setErrorMessage(error.response.data.message);
                else if (error?.response?.status) setErrorMessage(error.response.statusText);
                else setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }
        }
    }

    let message = <></>;
    
    if (loading) message = <p>Loading...</p>
    else if (errorMessage) message = <p>{errorMessage}</p>;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label className="signup-field">
                    <span>Username</span><br />
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}/>
                </label>
                <br />
                <label className="signup-field">
                    <span>Password</span><br />
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                </label>
                <br />
                <label className="signup-field">
                    <span>Confirm Password</span><br />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}/>
                </label>
                <br />
                <button className="signup-button" type="submit">Sign up</button>

            </form>
            { message }
        </div>
    );
}

export default Login;