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
        setError(null); // Clear previous errors
        try {
            const user = { Email: email, Password: password };
            const response = await fetch('https://localhost:7294/api/Employee/LoginRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const text = await response.text();
            let data = null;
            try {
                data = response.headers.get('content-type')?.includes('application/json') ? JSON.parse(text) : { message: text };
            } catch {
                data = { message: text };
            }

            if (!response.ok) {
                setError(data?.message || 'Login failed');
                return;
            }

            if (data?.token) {
                localStorage.setItem('token', data.token);                
                const empResponse = await fetch('https://localhost:7294/api/Employee/GetId', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${data.token}`
                    },
                    body: JSON.stringify(email) // Send email as a plain string
                });

                if (!empResponse.ok) {
                    setError('Failed to retrieve employee ID');
                    return;
                }

                const empId = await empResponse.json();
                if (typeof empId === 'number') {
                    navigate(`/home/${empId}`);
                } else {
                    setError('Invalid employee ID received');
                }
            } else {
                setError('Invalid response from server.');
            }
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
                        name='email'
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input 
                        name='password'
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