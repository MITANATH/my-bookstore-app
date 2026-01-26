import React, { useState, useEffect } from 'react';
import { bookService } from '../services/bookService';
const BookList = ({ user, onBookSelect, onLogout }) => {
const [books, setbooks] = useState([]);
const [loading, setLoading] = useState(true);
const [showAddForm, setShowAddForm] = useState(false);
const [deletingBook, setDeletingBook] = useState(null);
const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
const [newBook, setNewBook] = useState({
name: '',
Genre: '',
Author: '',
datePublished: ''
});
useEffect(() => {
loadUserBooks();
}, [user]);
const loadUserBooks = async () => {
if (!user) return;
setLoading(true);
const result = await bookService.getUserbooks(user.uid);
if (result.success) {
setBooks(result.data);
}
setLoading(false);
};
const handleAddBook = async (e) => {
e.preventDefault();
// Validate required fields
if (!newBook.name.trim() || !newBook.datePublished) {
alert('Please fill in book name and published date');
return;
}
const result = await bookService.addbookToBookstore(user.uid, {
...newBook,
name: newBook.name.trim(),
Genre: newBook.genre.trim() || 'Unknown',

datePublished: new Date(newBook.datePublished)
});
if (result.success) {
setBooks([...Books, result.data]);
setNewBook({ name: '', genre: '', datePublished: '' });
setShowAddForm(false);
} else {
alert('Failed to add book: ' + result.error);
}
};
const handleDeleteBook = async (BookToDelete, event) => {
// Prevent card click event from firing
event.stopPropagation();
setDeletingBook(bookToDelete);
setShowDeleteConfirm(true);
};
const confirmDeleteBook = async () => {
if (!deletingBook) return;
const result = await BookService.removeBook(user.uid, deletingBook.id);
if (result.success) {
// Remove book from local state
setBooks(books.filter(book => book.id !== deletingBook.id));
setShowDeleteConfirm(false);
setDeletingBook(null);
} else {
alert('Failed to delete Book: ' + result.error);
}
};
const cancelDelete = () => {
setShowDeleteConfirm(false);
setDeletingBook(null);
};
if (loading) {
return <div className="loading">Loading your bookstore...</div>;
}
return (
<div className="book-list">
<header className="bookstore-header">
<h1>📚 {user.displayName || 'My Bookstore'}</h1>
<div className="header-actions">
<button
className="btn-primary"
onClick={() => setShowAddForm(true)}
>
+ Add Plant
</button>
<button className="btn-secondary" onClick={onLogout}>
Logout
</button>
</div>
</header>
{showAddForm && (
<div className="add-book-form">
<h3>Add New Book</h3>
<form onSubmit={handleAddBook}>
<div className="form-row">
<input
type="text"
placeholder="Book name *"
value={newBook.name}
onChange={(e) => setNewPlant({...newPlant, name: e.target.value})}
required
/>
<input
type="text"
placeholder="Genre (optional)"
value={newBook.genre}
onChange={(e) => setNewPlant({...newBook, genre: e.target.value})}
/>
</div>
<div className="form-row">
<input
type="text"
placeholder="Location in bookstore (optional)"
value={newBook.location}
onChange={(e) => setNewBook({...newBook, location: e.target.value})}
/>
<input
type="date"
value={newBook.datePublished}
onChange={(e) => setNewBook({...newBook, datePublished: e.target.value})}
required
title="When was it published ?"
/>
</div>
<div className="form-actions">
<button type="submit" className="btn-primary">Add Book</button>
<button
type="button"
className="btn-secondary"
onClick={() => {
setShowAddForm(false);
setNewBook({ name: '', genre: '', datePlanted: '' });
}}
>
Cancel
</button>
</div>
</form>
</div>
)}
{/* Delete Confirmation Modal */}
{showDeleteConfirm && (
<div className="delete-modal-overlay">
<div className="delete-modal">
<h3>Delete Book</h3>
<p>Are you sure you want to remove <strong>{deletingBook?.name}</strong> from your Bookstore?</p>
<p className="warning-text">This action cannot be undone.</p>
<div className="modal-actions">
<button
className="btn-danger"
onClick={confirmDeleteBook}
>
Yes, Delete
</button>
<button
className="btn-secondary"
onClick={cancelDelete}
>
Cancel
</button>
</div>
</div>
</div>
)}
<div className="books-grid">
{books.length === 0 ? (
<div className="empty-bookstore">
<h3>Your bookstore is empty</h3>
<p>Add your first book to get started!</p>
<button
className="btn-primary"
onClick={() => setShowAddForm(true)}
>
Add Your First Book
</button>
</div>
) : (
books.map(book => (
<div
key={book.id}
className="book-card"
onClick={() => onBookSelect(book)}
>
<div className="book-card-header">
<button
className="delete-book-btn"
onClick={(e) => handleDeleteBook(book, e)}
title="Delete this book"
>
×
</button>
</div>
<div className="book-image">
{book.imageUrl ? (
<img src={book.imageUrl} alt={book.name} />
) : (
<div className="book-placeholder">📑</div>
)}
</div>
<div className="book-info">
<h4>{book.name}</h4>
<p>{book.genre || 'Unknown genre'}</p>
<small>{book.location || 'Bookstore'}</small>
<div className="book-meta">
<small>
published: {book.datePublished ?
new Date(book.datePublished.seconds * 1000).toLocaleDateString() :
'Unknown'
}
</small>
</div>
</div>

</div>
))
)}
</div>
</div>
);
};
export default BookList;