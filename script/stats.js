


// ####################################################################
// Functions to get number of clicks
// ####################################################################
function getClicks() {
    //firebase.auth().onAuthStateChanged(user => {
            //if (user) {
                db.collection("users/").doc("zjZa12cXlFWCySmqqzF9N8LLt542").onSnapshot(
                    function (snap) { //snap is just a name for what you captured
                        //do something
                        console.log(snap.data());
                        document.getElementById("clickCount").innerHTML = snap.data().clicks;
                    }
                )
            }
      //  }
    //}

    getClicks();