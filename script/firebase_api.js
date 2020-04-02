/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
*/

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDaKyXsddEuxKgrfD47zktGPowMDmA5L-c",
    authDomain: "projecthandwash-34333.firebaseapp.com",
    databaseURL: "https://projecthandwash-34333.firebaseio.com",
    projectId: "projecthandwash-34333",
    storageBucket: "projecthandwash-34333.appspot.com",
    messagingSenderId: "269852739877",
    appId: "1:269852739877:web:09a3a7b7fcaf7ffdc572cc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

