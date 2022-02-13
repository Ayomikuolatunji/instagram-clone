import React,{useEffect} from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL }from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCo0UIudRSybZIoh7u0vfSEpObx21n9pIU",
    authDomain: "instagram-clone-e02b0.firebaseapp.com",
    projectId: "instagram-clone-e02b0",
    storageBucket: "instagram-clone-e02b0.appspot.com",
    messagingSenderId: "749154980841",
    appId: "1:749154980841:web:5f50d2950674b6b5c1b178",
    measurementId: "G-C6LLYPV4SR"
};

const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
const storage = getStorage();
const auth = getAuth();

export const FireBaseApi=React.createContext()
export default function ContextApi({children}) {
  const [posts,setposts]=React.useState([]);
  const [user,setuser]=React.useState(null);
  const [id,setId]=React.useState(null)

 const postsData=async()=>{
   try{
    const allpost = collection(db, 'posts');
    const postSnapshot = await getDocs(allpost);
    const getAllPosts=postSnapshot.docs.map(doc =>{
     return doc.data()
    })
    setId(postSnapshot.docs.map(doc =>{
      return doc.id
     }))
    setposts(getAllPosts);
   }catch(error){
       console.log(error)
   } 
}
useEffect(()=>{
  postsData()
},[]);



// authentication logout api 

useEffect(()=>{
  auth.onAuthStateChanged((authUser)=>{
      if(authUser){ 
        setuser(authUser)
      }else{
         setuser(null)
      }
  })
},[])

const signUpcontext=async(email,password,name)=>{
    localStorage.setItem("username",name) 
    createUserWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
        return userCredential.user.displayName=name
     })
     .catch((error) => {
        console.log(error)
        alert(error.message)
     });
}
// authetication login api
const  loginContext=async(email,password)=>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        return user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode,errorMessage)
    });
}
  return(
      <FireBaseApi.Provider
        value={{
           id,
            posts,
            signUpcontext,
            loginContext,
            user,
            auth,
            storage,
            db,
            getDocs,
            ref, 
            uploadBytesResumable, 
            getDownloadURL,
            postsData
        }}>
         {children}
      </FireBaseApi.Provider>
  )
}
