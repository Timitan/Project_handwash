// Global Variables
let healthValue = 100;
let healthDecreaseRate = 0.5;
let clickGainHealthRate = 2;

// A variable to indicate how much the score is increased by
let rate = 1;

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
        if (healthValue > 100){
            incRate = 100;
        } else{
            if (healthValue < 0){
                incRate = 0;
            } else{
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
                if (d.get("clicks") != null)
                    x = d.data()["clicks"];
                else
                    x = 0; // user has not played yet

                // Displays the amount
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

            // Increment user's clicks
            let incRate = firebase.firestore.FieldValue.increment(rate);
            userRef.update({
                    clicks: incRate
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

gameStart();