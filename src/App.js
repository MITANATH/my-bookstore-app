import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import { userService } from './services/userService';
import LandingPage from './components/LandingPage';
import PlantList from './components/BookList';
import PlantPage from './components/BookPage';
import './App.css';
function App() {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [currentView, setCurrentView] = useState('landing');
const [selectedBook, setSelectedBook] = useState(null);
useEffect(() => {
const unsubscribe = onAuthStateChanged(auth, (user) => {
setUser(user);
setCurrentView(user ? 'bookstore' : 'landing');
setLoading(false);
});
return unsubscribe;
}, []);
const handleUserAuthenticated = (user) => {
setUser(user);
setCurrentView('bookstore');
};
const handleLogout = async () => {
await userService.logoutUser();
setUser(null);
setCurrentView('landing');
setSelectedBook(null);
};
const handleBookSelect = (Book) => {
setSelectedBook(Book);
setCurrentView('Book');
};
const handleBookUpdate = (updatedBook) => {
setSelectedBook(updatedBook);
};
const handleBackToBookstore = () => {
setSelectedBook(null);
setCurrentView('boookstore');
};
if (loading) {
return (
<div className="app-loading">
<div className="loading-content">
<h2>📚 My Bookstore App</h2>
<p>Loading...</p>
</div>
</div>
);
}
return (
<div className="App">
{currentView === 'landing' && (
<LandingPage onUserAuthenticated={handleUserAuthenticated} />
)}
{currentView === 'garden' && user && (
<BookList
user={user}
onPlantSelect={handleBookSelect}
onLogout={handleLogout}
/>
)}
{currentView === 'book' && selectedBook && (
<BookPage
book={selectedBook}
user={user}
onBack={handleBackToBookstore}
onPlantUpdate={handleBookUpdate}
/>
)}
</div>
);
}
export default App;
