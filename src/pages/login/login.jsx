import React, { useState, useContext } from 'react';
import { ShopContext } from '../../context/shop-context';
import { useNavigate } from 'react-router-dom';
import './login.css';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setIsAuthenticated } = useContext(ShopContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
       
        if (username === 'username' && password === 'password') {
            setIsAuthenticated(true); 
            navigate('/');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};