import React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

function ForgotPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const [sent, setSent] = useState(false);
    const [email, setEmail] = useState(location.state?.email);
    const [otp, setOtp] = useState();
    
    const Checkmail = () => {
        if (!email) {
            alert("Please enter your email");
            return;
        }
        else if (sent) {
            if (!otp) {
                alert("Please enter the OTP");
                return;
            }
            else if (otp.length !== 6 || isNaN(otp)) {
                alert("Please enter a valid OTP");
                return;
            }
            else {
                const varificaton = { Email: email, Otp: otp };
                fetch('https://localhost:7294/api/Employee/Forgot_Password_otpcheck', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(varificaton),
                })
                    .then(async response => {
                        if (response.ok) {
                            alert("Otp verified successfully");
                            navigate('/new-password', { state: { email } }); // Redirect to new password page after successful verification
                        } else {
                            navigate('/forgot-password', { state: { email } }); // Redirect to forgot password page on error
                            const errorData = await response.json();
                            throw new Error(errorData?.message || 'Incorrect OTP');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert("Failed to verify OTP");
                    });
            }
        }
        else {
            const user = { Email: email };
            fetch('https://localhost:7294/api/Employee/Forgot_Password_mailcheck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
                })
                .then(response => {
                    if (response.ok) {
                        setSent(true);
                        alert("Otp sent to your email");
                    }
                    else {
                        throw new Error('Failed to send OTP -- email not registered');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert("Failed to send OTP-------hfghfghgf");
                });
        }
    }
    return (
        <div className="auth-container">
            <div className="forgot-password-form">
                <h2 className="form-title">Reset Password</h2>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                        disabled={sent}
                    />
                </div>
                {sent && (
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="form-input"
                            maxLength={6}
                        />
                    </div>
                )}
                <button onClick={Checkmail} className="reset-button">
                    {sent ? 'Verify OTP' : 'Send OTP'}
                </button>
                <Link to="/login" className="login-link">
                    Back to Login
                </Link>
            </div>
        </div>
    );
}

export default ForgotPassword;