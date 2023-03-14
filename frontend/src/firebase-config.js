import { initializeApp } from 'firebase/app';
import { getAuth} from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDMUr3OSyFKLRYoWXgtXSpTaNn1iuD3kTw",
    authDomain: "phone-auth-5ce2e.firebaseapp.com",
    projectId: "phone-auth-5ce2e",
    storageBucket: "phone-auth-5ce2e.appspot.com",
    messagingSenderId: "599736680295",
    appId: "1:599736680295:web:ffa41bb0199135503df9c2",
    measurementId: "G-7EPLW9TG3K"
};

const app = initializeApp(firebaseConfig);
export const authentication= getAuth(app)

export  const storage_bucket= getStorage(app)