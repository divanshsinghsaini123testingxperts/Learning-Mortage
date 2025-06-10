import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            setError('');
            setIsLoading(true);

            // Validation
            if (!name || !email || !password || !confirmPassword) {
                setError('Please fill in all fields');
                return;
            }

            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            const user = { Id: 0, Name: name, Email: email, Password: password };
            
            const response = await fetch('https://localhost:7109/api/AuthService/Register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include', // Include cookies if your API uses them
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || 'Registration failed');
            }

            const data = await response.json();
            console.log('Registration successful:', data);
            
            // Show success message before redirecting
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (error) {
            console.error('Error:', error);
            setError(error.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="register-form">
                <h2 className="form-title">Create Account</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <input
                        type="text" 
                        placeholder="Full Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        className="form-input"
                        disabled={isLoading}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        className="form-input"
                        disabled={isLoading}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        className="form-input"
                        disabled={isLoading}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        className="form-input"
                        disabled={isLoading}
                    />
                </div>
                <button 
                    onClick={handleRegister} 
                    className="register-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
                <Link to="/login" className="login-link">
                    Already have an account? Sign in
                </Link>
            </div>
        </div>
    );
}

export default Register;