


// ####################################################################
// Functions to get number of clicks
// ####################################################################
function getClicks() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            
            db.collection("users/").doc(user.uid)
                .get().then(function (doc) {
                    if (doc.exists) {
                        console.log(doc.data());
                        document.getElementById("clickCount").innerHTML = doc.data().clicks;
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