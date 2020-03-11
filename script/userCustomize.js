function loginMessage() {
    
    let user = firebase.auth().currentUser;
    if (user != null) {
        // User is signed in.
        document.getElementById("message").innerHTML = user.name;
        console.log(user.name);
    } else {
        // No user is signed in.
        document.getElementById("message").innerHTML = "test";
        console.log(user.name);
    }
}

loginMessage();
