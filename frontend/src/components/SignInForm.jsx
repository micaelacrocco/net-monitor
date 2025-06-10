import './SignInForm.css';

const SignInForm = ({ formData, handleChange, handleSignIn, error, success }) => {
    return (
        <form onSubmit={handleSignIn} className="signinform-container">
            <h1 className="title">Sign In</h1>
            {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
            {success && <p style={{ color: 'green', fontSize: '14px' }}>{success}</p>}
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input"
            />
            <button type="submit" className="btn">SIGN IN</button>
        </form>
    );
}

export default SignInForm;