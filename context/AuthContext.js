import React from 'react';
import firebase from '../firebase';
import 'firebase/auth';
import 'firebase/database';
import {Alert} from 'react-native';

export const AuthContext = React.createContext();

export const AuthProvider = ({children, navigation}) => {
    const [user, setUser] = React.useState(null);

    function errorAlert(message, data) {
        Alert.alert(
            message,
            data,
            [
              {
                text: "OK",
                style: "cancel"
              }
            ]
        );
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
                        console.log(e);
                        return 0;
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
                        await firebase.database().ref('users/'+name+":"+firebase.auth().currentUser.uid).set({
                            email: email,
                            name: name,
                            phone: phone
                        })
                        setUser(firebase.auth().currentUser);
                        console.log("Registered!");
                    } catch (e) {
                        switch (e.code) {
                            case 'auth/weak-password':
                                errorAlert("Password must be at least 6 characters!", '');
                                break;
                            case 'auth/email-already-in-use':
                                errorAlert("Email already in use!", email);
                                break;
                            default:
                                console.log(e.code);
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
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}