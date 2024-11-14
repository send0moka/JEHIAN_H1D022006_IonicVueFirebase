import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyByJAOIYNStRtSTCzXHmmRKcD9ICMgIKto",
  authDomain: "vue-firebase-c8467.firebaseapp.com",
  projectId: "vue-firebase-c8467",
  storageBucket: "vue-firebase-c8467.firebasestorage.app",
  messagingSenderId: "672708876525",
  appId: "1:672708876525:web:31275471628616ae4ed4e4",
}

const firebase = initializeApp(firebaseConfig)
const auth = getAuth(firebase)
const googleProvider = new GoogleAuthProvider()

export { auth, googleProvider }
