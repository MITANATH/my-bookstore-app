import React, { useState } from 'react';
import { bookService } from '../services/bookService';
const BookPage = ({ book, user, onBack, onBookUpdate }) => {
const [isEditing, setIsEditing] = useState(false);
const [newNote, setNewNote] = useState('');
const [editData, setEditData] = useState(book);
const handleSaveEdit = async () => {
const result = await bookService.updatebook(user.uid, book.id, editData);
if (result.success) {
onBookUpdate({ ...book, ...editData });
setIsEditing(false);
}
};
const handleAddNote = async () => {
if (!newNote.trim()) return;
const result = await bookService.addBookNote(user.uid, book.id, newNote);
if (result.success) {
onBookUpdate({ ...book, notes: result.notes });
setNewNote('');
}
};
const formatDate = (date) => {
if (!date) return 'Not specified';
const d = date.toDate ? date.toDate() : new Date(date);
return d.toLocaleDateString();
};
return (
<div className="book-page">
<header className="book-header">
<button className="back-button" onClick={onBack}>
← Back to Bookstore
</button>
<button
className="edit-button"
onClick={() => setIsEditing(!isEditing)}
>
{isEditing ? 'Cancel' : 'Edit'}
</button>
</header>
<div className="Book-details">
<div className="Book-main-image">
{Book.imageUrl ? (
<img src={Book.imageUrl} alt={Book.name} />
) : (
<div className="book-placeholder-large">🌿</div>
)}
</div>
<div className="book-info-section">
{isEditing ? (
<div className="edit-form">
<input
type="text"
value={editData.name}
onChange={(e) => setEditData({...editData, name: e.target.value})}
placeholder="Book name"
/>
<input
type="text"
value={editData.types}
onChange={(e) => setEditData({...editData, types: e.target.value})}
placeholder="types"
/>
<input
type="text"
value={editData.location}
onChange={(e) => setEditData({...editData, location: e.target.value})}
placeholder="Location"
/>
<button className="btn-primary" onClick={handleSaveEdit}>
Save Changes
</button>
</div>
) : (
<div className="book-display">
<h1>{book.name}</h1>
<p className="types">{book.types}</p>
<div className="book-metadata">
<div className="metadata-item">
<strong>Location:</strong> {book.location}
</div>
<div className="metadata-item">
<strong>author:</strong> {formatDate(book.dateAuthor)}
</div>
<div className="metadata-item">
<strong>Added to Bookstore:</strong> {formatDate(book.createdAt)}
</div>
</div>
</div>
)}
</div>
</div>
<div className="notes-section">
<h3>Notes</h3>
<div className="add-note">
<textarea
value={newNote}
onChange={(e) => setNewNote(e.target.value)}
placeholder="Add a note about this book..."
rows="3"
/>
<button
className="btn-primary"
onClick={handleAddNote}
disabled={!newNote.trim()}
>
Add Note
</button>
</div>
<div className="notes-list">
{book.notes && book.notes.length > 0 ? (
book.notes.map(note => (
<div key={note.id} className="note-item">
<p>{note.text}</p>
<small>{formatDate(note.createdAt)}</small>
</div>
))
) : (
<p className="no-notes">No notes yet. Add your first observation!</p>
)}
</div>
</div>
</div>
);
};
export default BookPage;
