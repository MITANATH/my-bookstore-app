import React, { useState } from 'react';
import { userService } from '../services/userService';
const SignupComponent = ({ mode, onSuccess, onBack }) => {
const [formData, setFormData] = useState({
email: '',
password: '',
displayName: '',
consentToStore: false // Explicit consent for data storage
});
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const isLogin = mode === 'login';
const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true);
setError('');
// Validate consent for signup
if (!isLogin && !formData.consentToStore) {
setError('Please consent to storing your garden data');
setLoading(false);
return;
}
try {
let result;
if (isLogin) {
result = await userService.loginUser(formData.email, formData.password);
} else {
result = await userService.registerUser(
formData.email,
formData.password,
formData.displayName
);
}
if (result.success) {
onSuccess(result.user);
} else {
setError(result.error);
}
} catch (err) {
setError('Something went wrong. Please try again.');
}
setLoading(false);
};
return (
<div className="signup-component">
<div className="form-header">
<button className="back-button" onClick={onBack}>← Back</button>
<h2>{isLogin ? 'Welcome Back' : 'Create Your Account'}</h2>
</div>
<form onSubmit={handleSubmit} className="auth-form">
{!isLogin && (
<div className="form-group">
<label>Bookstore Name (Display Name)</label>
<input
type="text"
value={formData.displayName}
onChange={(e) => setFormData({...formData, displayName: e.target.value})}
placeholder="My Bookstore"
required
/>
</div>
)}
<div className="form-group">
<label>Email</label>
<input
type="email"
value={formData.email}
onChange={(e) => setFormData({...formData, email: e.target.value})}
placeholder="your@email.com"
required
/>
</div>
<div className="form-group">
<label>Password</label>
<input
type="password"
value={formData.password}
onChange={(e) => setFormData({...formData, password: e.target.value})}
placeholder="Enter password"
required
/>

</div>
{!isLogin && (
<div className="form-group consent-group">
<label className="consent-label">
<input
type="checkbox"
checked={formData.consentToStore}
onChange={(e) => setFormData({...formData, consentToStore: e.target.checked})}
required
/>
I consent to storing my bookstore data and book information
</label>
<small className="consent-note">
Your data will only be used for your bookstore management and will never be shared.
</small>
</div>
)}
{error && <div className="error-message">{error}</div>}
<button
type="submit"
className="btn-primary"
disabled={loading}
>
{loading ? 'Please wait...' : (isLogin ? 'Enter My Bookstore' : 'Create Bookstore')}
</button>
</form>
<div className="form-footer">
<button
className="link-button"
onClick={() => onBack()}
>
{isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
</button>
</div>
</div>
);
};
export default SignupComponent;