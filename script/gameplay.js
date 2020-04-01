// Global Variables
let healthValue = 100;
let healthDecreaseRate = 0.5;
let clickGainHealthRate = 2;
let globalRate = 1;

// A variable to indicate how much the score is increased by
//let rate = 1;

function toggleShop() {
    let shopMenu = document.getElementById("mySideNav");
    let shopBtn = document.getElementById("shop-button");
    let height = shopMenu.style.width;
    let openValue = "50vw";
    let closedValue = "0vw";

    if (height == closedValue || height == "") {
        shopMenu.style.width = openValue;
        shopBtn.style.right = openValue;
    } else {
        shopMenu.style.width = closedValue;
        shopBtn.style.right = closedValue;
    }
}
// ####################################################################
// Functions for display health and updating firebase
// ####################################################################

function setHealth(value) {
    firebase.auth().onAuthStateChanged(function (user) {
        let userRef = db.collection('users').doc(user.uid);
        console.log(userRef);

        // Checks if the health value is over 100
        if (healthValue > 100) {
            incRate = 100;
        } else {
            if (healthValue < 0) {
                incRate = 0;
            } else {
                incRate = firebase.firestore.FieldValue.increment(value);
            }
        }

        // Sets the health and logs the time
        userRef.update({
                health: incRate,
                date: new Date()
            })
            .then(function () {
                // Execute after updating health variable
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    });
}

// Grabs the health variable from the database and displays it
function displayHealth() {
    firebase.auth().onAuthStateChanged(function (user) {
        // Gets the user's clicks
        db.collection("users/").doc(user.uid)
            .onSnapshot(function (d) {
                console.log("Current data: ", d.data());
                // Check if the "clicks" variable is there
                if (d.get("health") != null)
                    healthPoints = d.data()["health"];
                else
                    healthPoints = 0; // user has not played yet

                healthValue = healthPoints;
                // Displays the amount
                document.getElementById("clean-bar").style.width = healthPoints + "%"
            });
    });
}

// ####################################################################
// Functions for displaying score and updating firebase
// ####################################################################

function displayScore() {
    firebase.auth().onAuthStateChanged(function (user) {
        // Gets the user's clicks
        db.collection("users/").doc(user.uid)
            .onSnapshot(function (d) {
                console.log("Current data: ", d.data());
                // Check if the "clicks" variable is there
                if (d.get("score") != null)
                    x = d.data()["score"];
                else
                    x = 0; // user has not played yet
                
                if (d.get("rate") != null)
                    y = d.data()["rate"];
                else
                    y = 0;

                // Displays the amount
                console.log(y);
                
                let scoreDisplay = document.getElementById("money-display");
                scoreDisplay.innerHTML = "$ " + x;

            });
    });
}


function setHandEventListener() {
    // Adds an event listener to the hand when it is clicked
    document.getElementById("handDiv").addEventListener("mousedown", function (e) {
        firebase.auth().onAuthStateChanged(function (user) {
            setHealth(clickGainHealthRate);
            let userRef = db.collection('users').doc(user.uid);

            // Increment user's clicks and score
            //let rate = db.collection("users/").doc(user.uid).data()["rate"];
            let incRate = firebase.firestore.FieldValue.increment(globalRate);
            let clickInc = firebase.firestore.FieldValue.increment(1);
            userRef.update({
                    score: incRate,
                    clicks: clickInc
                })
                .then(function () {
                    // Execute after updating health variable
                    //displayScore(rate);
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        });
    });
}


// ####################################################################
// Functions to call when opening webpage
// ####################################################################

/* All the functions to be executed when the page is run.*/
function gameStart() {
    /* Decrease health bar at a constant rate*/
    let timerRate = 20000;
    setInterval(function () {
        setHealth(-healthDecreaseRate);
    }, timerRate);

    displayScore();
    displayHealth();
    setHandEventListener();
}


<<<<<<< HEAD
function buyAbility(ability) {
    let score = db.collection("users/").doc(user.uid).data()["score"];
    let increment = firebase.firestore.FieldValue.increment(rate);
=======
function buyAbility(ability){
    //let score = db.collection("users/").doc(user.uid).data()["score"];
    //let increment = firebase.firestore.FieldValue.increment(rate);
>>>>>>> dd29140e009328697b6c5a74f59e7156ecac64b7
    let confirm = document.createElement("div");
    confirm.style.width = "50px";
    confirm.style.height = "50px";
    switch (ability) {
        case ("handSanitizer"):
            if (score > 15) {}
            break;
        case ("water"):
            if (score)
                break;
        case ("soap"):
            break;
        case ("liquidSoap"):
            break;
        case ("rubbingAlcohol"):
            break;
        case ("antiseptic"):
            break;
        case ("radiation"):
            break;
    }

}

    
    gameStart();