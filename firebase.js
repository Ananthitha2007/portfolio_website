import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAzNTgfYAsXBuGSpFYHABBVthmGEIt0ZMI",
    authDomain: "portfolio-website-a3557.firebaseapp.com",
    projectId: "portfolio-website-a3557",
    storageBucket: "portfolio-website-a3557.firebasestorage.app",
    messagingSenderId: "611792130315",
    appId: "1:611792130315:web:a27844aea2eb2639d4520e",
    measurementId: "G-VM6WD19WHR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and make it available as 'db'
export const db = getFirestore(app);
