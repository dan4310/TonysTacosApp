import React from 'react';
import firebase from '../firebase';
import 'firebase/auth';
import 'firebase/database';

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = React.useState(null);

    function errorAlert(message) {
        toast.show(message, {type: 'danger'})
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        await firebase.auth().signInWithEmailAndPassword(email, password);
                    } catch (e) {
                        switch(e.code) {
                            case 'auth/user-not-found':
                                errorAlert('No user with that email!');
                                break;
                            case 'auth/wrong-password':
                                errorAlert('Wrong Password!');
                                break;
                            case 'auth/too-many-requests':
                                errorAlert('Too many attempts! Try later');
                                break;
                            case 'auth/invalid-email':
                                errorAlert('Invalid email!');
                                break;
                            default:
                                errorAlert(e.code, e.message);
                        }
                    }
                },
                register: async (email, password, name, phone) => {
                    try {
                        await firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(result => {
                            result.user.updateProfile({
                                displayName: name,
                                phone: phone
                            })
                        })
                        await firebase.database().ref('users/'+firebase.auth().currentUser.uid).set({
                            email: email,
                            name: name,
                            phone: phone
                        })
                        setUser(firebase.auth().currentUser);
                    } catch (e) {
                        switch (e.code) {
                            case 'auth/weak-password':
                                errorAlert("Password must be at least 6 characters!");
                                break;
                            case 'auth/email-already-in-use':
                                errorAlert("Email already in use!");
                                break;
                            default:
                                errorAlert(e.code);
                        }
                        return 0;
                    }
                },
                logout: async () => {
                    try {
                        await firebase.auth().signOut();
                    } catch (e) {
                        console.log(e);
                    }
                },
                resetPassword: async (email) => {
                    try {
                        await firebase.auth().sendPasswordResetEmail(email);
                        toast.show('Email sent! Check your inbox.', {type: 'success'})
                    } catch (e) {
                        switch(e.code) {
                            case 'auth/user-not-found':
                                errorAlert("Email address not registered!");
                                break;
                            case 'auth/invalid-email':
                                errorAlert("Invalid email!");
                                break;
                            default:
                                errorAlert(e.code);
                        }
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}