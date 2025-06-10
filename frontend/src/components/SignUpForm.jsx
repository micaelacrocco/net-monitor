import './SignUpForm.css';

const singUpForm = (formData, handleChange, handleSignUp, error, success) => {
    return (
        <form onSubmit={handleSignUp} className="signupform-container">
            <h1 className="title">Sign Up</h1>
            {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
            {success && <p style={{ color: 'green', fontSize: '14px' }}>{success}</p>}
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input"
            />
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
            <button type="submit" className="btn">SIGN UP</button>
        </form>
    );
}

export default singUpForm;