import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // prevents page from refreshing when clicking submit button
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
    };

    return (
        <div className="login-view">
            <h1>Welcome to CinemaDatabase!</h1>
            <h2>Login:</h2>
            <form>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
            <span>New user?</span><button>Register here</button>
        </div>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
}