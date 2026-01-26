import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, query, getDocs } from 'firebase/firestore';
// book-related data functions
export const bookService = {
// Add book to user's collection (requires user consent for data storage)
async addBookToBookstore(userId, bookData) {
try {
const bookId = `book_${Date.now()}`;
const bookRef = doc(db, 'userBooks', userId, 'books', bookId);
const bookWithMetadata = {
...bookData,
id: bookId,
createdAt: new Date(),
lastModified: new Date()
};
await setDoc(bookRef, bookWithMetadata);
return { success: true, bookId, data: bookWithMetadata };
} catch (error) {
return { success: false, error: error.message };
}
},
// Get user's book collection
async getUserBooks(userId) {
try {
const booksRef = collection(db, 'userbooks', userId, 'books');
const booksQuery = query(booksRef);
const querySnapshot = await getDocs(booksQuery);
const books = [];
querySnapshot.forEach((doc) => {
books.push({ id: doc.id, ...doc.data() });
});
return { success: true, data: books };
} catch (error) {
return { success: false, error: error.message };
}
},
// Update books information
async updatebooks(userId, bookId, updates) {
try {
const bookRef = doc(db, 'userbooks', userId, 'books', bookId);
const updateData = {
...updates,
lastModified: new Date()
};
await updateDoc(bookRef, updateData);
return { success: true, data: updateData };
} catch (error) {
return { success: false, error: error.message };
}
},
// Remove book from bookstore
async removebook(userId, bookId) {
try {
const bookRef = doc(db, 'userbooks', userId, 'books', bookId);
await deleteDoc(bookRef);
return { success: true };
} catch (error) {
return { success: false, error: error.message };
}
},
// Add note to plant (temporary state that becomes permanent with user action)
async addbookNote(userId, bookId, note) {
try {
const bookRef = doc(db, 'userbooks', userId, 'books', bookId);
const bookDoc = await getDoc(bookRef);
if (bookDoc.exists()) {
const currentData = bookDoc.data();
const updatedNotes = [...(currentData.notes || []), {
id: `note_${Date.now()}`,
text: note,
createdAt: new Date()
}];
await updateDoc(bookRef, { notes: updatedNotes });
return { success: true, notes: updatedNotes };
}
return { success: false, error: 'Book not found' };
} catch (error) {
return { success: false, error: error.message };
}

}
}