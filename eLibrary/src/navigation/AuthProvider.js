import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

// export component to any {child} that needs it
export const AuthContext = createContext(); 

// This context object is then used to pass data down to child components in the component tree.
// Any child can access this method 
export const AuthPovider = ({children}) => {
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false)
    const [userEmail, setUserEmail] = useState('')

    const messageToNewUser = {
        msg: "To complete the registration process", //pass this string to 'SignUpPage3' screen                                    //  and display it
        email: userEmail,
    }
    const messageToUnverifiedUser = {
        msg: "Your email address is unvrefied. Verify your email address first and try again", //pass this string to 'SignUpPage3' screen                                    //  and display it
        email: userEmail,
    }
    const messageToUserResetPassword = {
        msg: "To reset your password", //pass this string to 'SignUpPage3' screen                                    //  and display it
        email: userEmail,
    }

    return(
        <AuthContext.Provider
            value={{ // value define what data/method to pass or share
                user, // pass user state
                setUser,
                showModal,
                setShowModal,
                messageToNewUser,
                messageToUnverifiedUser,
                messageToUserResetPassword,
                setUserEmail,
                login: async ( email, password) => { // pass login method
                    try{
                         await auth().signInWithEmailAndPassword(email, password)
                    }catch(e){
                       return e;
                    }
                },
                register: async ( email, password ) => { // pass register method
                    try{
                        await auth().createUserWithEmailAndPassword(email, password)
                    }catch(e){
                        return e;
                    }
                },
                logout : async () => { // pass logout method 
                    try{
                        await auth().signOut();
                    }catch(e){
                        return e;
                    }
                },
                reset : async (email) => { // pass reset password method, if password is forgot
                    try{
                        await auth().sendPasswordResetEmail(email)
                    }catch(e){
                        return e;
                    }
                },
            }}// this {children} are any component that needs the method above define 
            // in {value} property
        >
            {children} 
        </AuthContext.Provider>
    );
}
