import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
// User-related data functions
export const userService = {
// Handle user registration (requires explicit consent)
async registerUser(email, password, displayName) {
try {
const userCredential = await createUserWithEmailAndPassword(auth, email, password);
const user = userCredential.user;
// Store user profile (with implicit consent through registration)
await setDoc(doc(db, 'users', user.uid), {
email: user.email,
displayName: displayName,
createdAt: new Date()
});
return { success: true, user };
} catch (error) {
return { success: false, error: error.message };
}
},
async loginUser(email, password) {
try {
const userCredential = await signInWithEmailAndPassword(auth, email, password);
return { success: true, user: userCredential.user };
} catch (error) {
return { success: false, error: error.message };
}
},
async logoutUser() {
try {
await signOut(auth);
return { success: true };
} catch (error) {
return { success: false, error: error.message };
}
},
async getUserProfile(userId) {
try {
const userDoc = await getDoc(doc(db, 'users', userId));
if (userDoc.exists()) {
return { success: true, data: userDoc.data() };
}
return { success: false, error: 'User not found' };
} catch (error) {
return { success: false, error: error.message };
}
}
};