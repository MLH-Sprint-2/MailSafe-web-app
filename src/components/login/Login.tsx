import React, { useState } from 'react';

import { login } from '../../api/mailSafe';

import './Login.css'

const Login: React.VFC<{ 
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    setAuthToken: React.Dispatch<React.SetStateAction<string>>,
    setEmail: React.Dispatch<React.SetStateAction<string>>
 }> = ({ setIsLoggedIn, setAuthToken, setEmail }) => {

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!username || !password) {
            setErrorMessage("Username and password cannot be empty");
        } else {
            try {
                setErrorMessage("");
                setLoading(true);

                // send request
                const [ token, userEmail ] = await login(username, password);
                setAuthToken(token);
                setEmail(userEmail)
                setLoading(false);
                setIsLoggedIn(true);
            } catch (error) {
                if (error?.response?.data?.message) setErrorMessage(error.response.data.message);
                else if (error?.response?.status) setErrorMessage(error.response.statusText);
                else setErrorMessage(error.message);
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
                <label className="login-field">
                    <span>Username</span><br />
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}/>
                </label>
                <br />
                <label className="login-field">
                    <span>Password</span><br />
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                </label>
                <br />
                <button className="login-button" type="submit">Login</button>

            </form>

            { message }
        </div>
    );
}

export default Login;