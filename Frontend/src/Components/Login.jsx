import React from 'react';
import { useState } from 'react';
import { useNavigate, Link , useLocation } from 'react-router-dom';

function Login(){
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || '');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
   
    const handleLogin = async () => {
        try {
            const user = { Email: email, Password: password };
            const response = await fetch('https://localhost:7109/api/AuthService/LoginRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${localStorage.getItem("token")}` 
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Login successful:', data);
            localStorage.setItem('token', data.token);
            navigate('/home');
        } catch (error) {
            console.error('Error:', error);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="auth-container">
            <div className="login-form">
                <h2 className="form-title">Welcome Back</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="form-input"
                    />
                </div>
                <button onClick={handleLogin} className="login-button">
                    Sign In
                </button>
                <Link to="/forgot-password" className="forgot-password-link">
                    Forgot Password? 
                </Link>
                <Link to="/register" className="register-link">
                    Don't have an account? Register here
                </Link>
            </div>
        </div>
    );
}

export default Login;