import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import {AuthContext} from '../context/AuthContext';
import firebase from '../firebase';

const Routes = () => {
    const {user, setUser} = React.useContext(AuthContext);
    const [initializing, setInitializing] = React.useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if(initializing) setInitializing(false);
    }
    
    React.useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, [])

    if(initializing) return null;

    return (
        <NavigationContainer>
            { user ? <MainStack/> : <AuthStack/>}
        </NavigationContainer>
    )
}

export default Routes;