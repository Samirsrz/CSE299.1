import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
   
    const createUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }


    const updateUserProfile =(name, photo) => {
      return  updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })

        .then(() => {
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error updating profile:", error);
            setLoading(false);
        });
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email,password)
    }

   

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
      }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
    
            const userEmail = currentUser?.email || user.email;
            const loggedUser = {email : userEmail}

            setUser(currentUser);
          //  console.log('current user', currentUser);
            setLoading(false);

          if(currentUser) {
            axios.post('http://localhost:4000/jwt', loggedUser,{withCredentials:true})
            .then(res => {
               // console.log(res.data)
            })
          }
          else{
            axios.post('http://localhost:4000/logout', loggedUser, {withCredentials: true})
            .then(res => {
           //     console.log(res.data)
            })
        }
         });
         return () => {
            return unsubscribe();
         }
    
        },[user?.email])
    const authInfo = {

        user,
        
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        signInWithGoogle
       }



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;