import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";


export const AuthContext = createContext(null)

const auth = getAuth(app)

const AuthProviders = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUsersProfile = (user, name) => {
        return updateProfile(user, {
            displayName: name
        })
    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            // console.log(currentUser)
            setUser(currentUser)
            setIsLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const authInfo = {
        user,
        isLoading,
        createUser,
        updateUsersProfile,
        signIn,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;