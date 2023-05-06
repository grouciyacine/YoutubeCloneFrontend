import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyC8Vf0caK2sWFS44BhnMchJKMc23Q5_VkY",
    authDomain: "clone1-69a4f.firebaseapp.com",
    projectId: "clone1-69a4f",
    storageBucket: "clone1-69a4f.appspot.com",
    messagingSenderId: "639196583962",
    appId: "1:639196583962:web:edef8f70f19998cf4219a3",
    measurementId: "G-BSW1Q9WWC9"
};
const app = initializeApp(firebaseConfig);
export const auth=getAuth()
export const provider=new GoogleAuthProvider()
export default app