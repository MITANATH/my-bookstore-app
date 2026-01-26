import React, { useState } from 'react';
import SignupComponent from './SignupComponent';
const LandingPage = ({ onUserAuthenticated }) => {
const [showSignup, setShowSignup] = useState(false);
return (
<div className="landing-page">
<header className="landing-header">
<h1>📚 My bookstore App</h1>
<p>Track and maintain your books with ease</p>
</header>
<main className="landing-content">
{!showSignup ? (
<div className="welcome-section">
<h2>Welcome to Your Digital Library</h2>
<p>Keep track of your books, their reading schedules, and progress.</p>
<div className="action-buttons">
<button
className="btn-primary"
onClick={() => setShowSignup(true)}
>
Start Your journey
</button>
<button
className="btn-secondary"
onClick={() => setShowSignup('login')}
>
I Have an Account
</button>
</div>
</div>
) : (
<SignupComponent
mode={showSignup}
onSuccess={onUserAuthenticated}
onBack={() => setShowSignup(false)}
/>
)}
</main>
</div>
);

};
export default LandingPage