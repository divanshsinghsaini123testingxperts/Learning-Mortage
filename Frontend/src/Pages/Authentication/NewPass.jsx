import {React , useEffect, useState}  from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';

const NewPass = () => {
    const navigate = useNavigate();
   
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const location = useLocation();
    const { email } = location.state || {};
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
    const allowed = sessionStorage.getItem('allowNewPass');
    if (!allowed || !email) {
        navigate('/forgot-password');
        sessionStorage.removeItem('allowNewPass');
    }
    // ...existing code...
}, [email]);
    const handlepass = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setIsLoading(true);

            if (!email || !password || !confirmPassword) {
                setError('Please fill in all fields');
                return;
            }

            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            const user = { Email: email, Password: password };
            const response = await fetch('https://localhost:7294/api/Employee/SetNewPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                alert("Password updated successfully!");
                navigate('/login', { state: { email } });
            } else {
                const errorData = await response.json();
                throw new Error(errorData?.message || 'Failed to update password');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to update password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="reset-password-form">
                <h2 className="form-title">Set New Password</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handlepass}>
                    <div className="form-group">
                        <input 
                            type="email"
                            id="email"
                            className="form-input"
                            placeholder="Email"
                            value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            disabled={location.state?.email}
                            readOnly
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password"
                            id="password"
                            className="form-input"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password"
                            id="confirm-password"
                            className="form-input"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit"
                        className="reset-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Updating Password...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NewPass;