import { initializeApp, getApps, getApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBop9FTMhnyF1dYb4k8GAKXjTB540tmu3Q",
  authDomain: "peeper-49f1b.firebaseapp.com",
  projectId: "peeper-49f1b",
  storageBucket: "peeper-49f1b.appspot.com",
  messagingSenderId: "757448659252",
  appId: "1:757448659252:web:32c969fac80636bbabd561",
  measurementId: "G-DD8ELLF7KL",
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const analytics = getAnalytics(app)

export default app
export { db }
