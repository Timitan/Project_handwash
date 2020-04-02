


// ####################################################################
// Functions to get User Stats
// ####################################################################
function getClicks() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            
            db.collection("users/").doc(user.uid)
                .get().then(function (doc) {
                    if (doc.exists) {
                        console.log(doc.data());
                        //Gets user anem, number of clicks and health.
                        document.getElementById("clickCount").innerHTML = "Number of clicks: " + doc.data().clicks;
                        document.getElementById("userName").innerHTML = "User Name: " + doc.data().name;
                        document.getElementById("health").innerHTML = "Health: " + doc.data().health;
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

    getClicks();