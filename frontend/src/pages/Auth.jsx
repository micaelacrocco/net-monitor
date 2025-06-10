import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import SignUpForm from '../components/SignUpForm';
import SignInForm from '../components/SignInForm';

import './Auth.css';

function Auth() {
    const navigate = useNavigate();

    const [isSignUp, setIsSignUp] = useState(false); 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    console.log('API URL:', process.env.REACT_APP_API_URL);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            setSuccess('Registration successful! You can now sign in.');
            setIsSignUp(false); 
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
                email: formData.email,
                password: formData.password
            });

            console.log('Full response:', response.data);
            console.log('User name:', response.data.user.name);

            if (response.data.user && response.data.user.name) {
                localStorage.setItem('name', response.data.user.name);
                localStorage.setItem('token', response.data.token);
                setSuccess('Login successful!');
                navigate('/dashboard');
            } else {
                setError('Name not received from backend');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className={`auth-container ${isSignUp ? 'active' : ''}`}>
            <div className='form-container sign-up'>
                <SignUpForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSignUp={handleSignUp}
                    error={error}
                    success={success}
                />
            </div>
            <div className='form-container sign-in'>
                <SignInForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSignIn={handleSignIn}
                    error={error}
                    success={success}
                />
            </div>
            <div className='toggle-container'>
                <div className='toggle'>
                    <div className="toggle-panel toggle-left">
                        <div className="logo-left">🧠 NetAlert</div>
                        <h1>Welcome,<br/><strong>Back!</strong></h1>
                        <button className='btn-ghost' onClick={() => setIsSignUp(false)}>SIGN IN</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <div className="logo-right">🧠 NetAlert</div>
                        <h1>Hello,<br/><strong>Welcome!</strong></h1>
                        <button className='btn-ghost' onClick={() => setIsSignUp(true)}>SIGN UP</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;