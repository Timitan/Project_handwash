// Global Variables
let healthValue = 100;
let healthDecreaseRate = 0.015;
let clickGainHealthRate = 0.85;

// A variable to indicate how much the score is increased by
let rate = 1;


function toggleShop() {
    let shopMenu = document.getElementById("mySideNav")
    let height = shopMenu.style.width;
    let openValue = "40vh";
    let closedValue = "0vh";

    if (height == closedValue || height == "") {
        shopMenu.style.width = openValue;
    } else {
        shopMenu.style.width = closedValue;
    }
}

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
            console.log(x);
            let scoreDisplay = document.getElementById("money-display");
            scoreDisplay.innerHTML = "$ " + x;

          });
    });
}

function setHealth(value){
    /* Ensure the healthbar does not exceed 100 or go below 0*/
    if (healthValue > 100){
        healthValue = 100;
    } else{
        if (healthValue < 0){
            healthValue = 0;
        } else{
            healthValue += value;
        }
    }
    document.getElementById("clean-bar").style.width = healthValue + "%"
}

function setAddListener(){
    // Adds an event listener to the hand when it is clicked
    document.getElementById("handDiv").addEventListener("mousedown", function(e){
        firebase.auth().onAuthStateChanged(function (user) {
            setHealth(clickGainHealthRate);
            let userRef = db.collection('users').doc(user.uid);

            // Increment user's clicks
            let incRate = firebase.firestore.FieldValue.increment(rate);
            userRef.update({
                clicks: incRate
            })
            .then(function() {
                // Increases the score by the given amount
                displayScore(rate);
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
        });
    });
}

/*
function handClickEventHandler(){
 displayScore();
    setHealth(clickGainHealthRate);
    incrementClicks();
}
*/

/* All the functions to be executed when the page is run.*/
function gameStart(){
    /* Decrease health bar at a constant rate*/
    let timerRate = 2;
    setInterval(function(){
        setHealth(-healthDecreaseRate);
    }, timerRate);

    displayScore()
    setAddListener();
}

gameStart();