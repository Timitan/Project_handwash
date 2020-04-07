// Display a message whenever the user logs in
function loginMessage() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            
            db.collection("users/").doc(user.uid)
                .get().then(function (doc) {
                    if (doc.exists) {
                        console.log("Document data:", doc.data());
                        let prevDate = doc.data().date.toDate();
                        let dateNow = new Date();

                        let timeElapsed = dateNow.getTime() - prevDate.getTime();

                        // Every 30 minutes, your hand gets dirtier by 1%
                        healthDecreased = Math.floor(timeElapsed / (1000 * 60 * 30 * 1))

                        console.log(timeElapsed / 50000) * 0.5;
                        setHealth(-healthDecreased);

                        // Creates germs on load based on health
                        createInitialGerms();

                        // Displays welcome back message
                        document.getElementById("displayName").innerHTML = "Welcome back " + user.displayName + "!<br><br>"
                                                                        + "While you were gone, your hand got " + healthDecreased 
                                                                        + "% dirter! Go clean it up!";
                        document.getElementById("displayMessage").style.background = "rgba(185, 185, 185, 0.75)";
                        document.getElementById("displayMessage").style.display = "block";
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch(function (error) {
                    console.log("Error getting document:", error);
                });
        }
    });

}

// Closes the welcome message
function closeMessage() {
    document.getElementById("displayMessage").style.background = "rgba(185, 185, 185, 0)";
    document.getElementById("displayMessage").style.display = "none";
}

loginMessage();

