function loginMessage() {
    /*
    let user = firebase.firestore().auth().currentUser;
    if (user != null) {
        // User is signed in.
        document.getElementById("message").innerHTML = user.name;
        console.log(user.name);
    } else {
        // No user is signed in.
        document.getElementById("message").innerHTML = "test";
        console.log(user.name);
    }
    */

   firebase.auth().onAuthStateChanged(user => {
        if (user) {
            document.getElementById("displayName").innerHTML = "Welcome back " + user.displayName;
            document.getElementById("displayMessage").style.background = "rgba(185, 185, 185, 0.75)";
            document.getElementById("displayMessage").style.display = "block";
        }
    });

}

loginMessage();

function closeMessage(){
    document.getElementById("displayMessage").style.background = "rgba(185, 185, 185, 0)";
    document.getElementById("displayMessage").style.display = "none";
}

function incrementClicks(){
    console.log(firebase.auth().currentUser)
}


