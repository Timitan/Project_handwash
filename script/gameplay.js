// Global Variables
let healthValue = 100;
let healthDecreaseRate = 0.5;
let clickGainHealthRate = 2;
let globalRate = 1;
let clickSound = new Audio("../sounds/hand_click.mp3");
let userScore;
let userID;

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
        if (healthValue >= 98) {
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
                userScore = x;
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
            userID = firebase.auth().currentUser.uid;
            let userRef = db.collection('users').doc(user.uid);
            //userID = userRef;
            /////Plays the sound/////
            clickSound.play();
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
function abilityCosts(ability) {
    let ability1;
    let ability2;
    let ability3;
    let ability4;
    let ability5;
    let ability6;
    let ability7;
    db.collection("users/").doc(userID).get().then(function (d) {
            ability1 = d.data()["ability1"];
            ability2 = d.data()["ability2"];
            ability3 = d.data()["ability3"];
            ability4 = d.data()["ability4"];
            ability5 = d.data()["ability5"];
            ability6 = d.data()["ability6"];
            ability7 = d.data()["ability7"];
        })
    switch (ability) {
        case ("ability1"):
            if (ability1 == 0) {
                return 15;
            } else {
                return (Math.ceil(15 * Math.pow(1.15, ability1)));
            }

            case ("water"):
                if (ability2 == 0) {
                    return 100;
                } else {
                    return (Math.ceil(100 * Math.pow(1.15, ability2)));
                }
                case ("soap"):
                    if (ability3 == 0) {
                        return 1100;
                    } else {
                        return (Math.ceil(1100 * Math.pow(1.15, ability3)));
                    }
                    case ("liquidSoap"):
                        if (ability4 == 0) {
                            return 12000;
                        } else {
                            return (Math.ceil(12000 * Math.pow(1.15, ability4)));
                        }
                        case ("rubbingAlcohol"):
                            if (ability5 == 0) {
                                return 130000;
                            } else {
                                return (Math.ceil(130000 * Math.pow(1.15, ability5)));
                            }
                            case ("antiseptic"):
                                if (ability6 == 0) {
                                    return 1400000;
                                } else {
                                    return (Math.ceil(1400000 * Math.pow(1.15, ability6)));
                                }
                                case ("radiation"):
                                    if (ability7 == 0) {
                                        return 20000000;
                                    } else {
                                        return Math.ceil((20000000 * Math.pow(1.15, ability7)));
                                    }

    }
}

function buyAbility(ability) {
    // this method isnt working yet
    // purchasing abilities only works once of the fields change cause i dont know how to set it up so it sets the userID on load
    // im using the firebase.auth().OnAuthChanged but i dont know a replacement for this
    let abilityPrice = abilityCosts(ability);
    //userID = firebase.auth().currentUser.uid;
    let confirm = document.getElementById("abilityConfirm");
    //createButton("No", 50, 50, "red");
    confirm.style.width = "100vw";
    confirm.style.height = "50vh";
    confirm.style.display = "inline";
    confirm.style.zIndex = "2";
    /** Checks which ability has been clicked and then checks if the user has enough points for the purchase
     *  If the user has enough points, they are prompted with whether or not they wish to purchase the ability
     *  if the user says yes then the ability is incremented by one and the score decremented by the 
     *  price of the ability 
     */
// wont work yet since abilityPrice returns nothing
// buttons are ugly
    switch (ability) {
        case ("ability1"):
            if (userScore < abilityPrice) {
                notEnoughScore();
            } else {
                confirm.innerHTML = "Would you like to buy this ability?<br>";
                createButton("Yes", 10, ability, abilityPrice);
                createButton("No", 50);
            }
            break;
        case ("ability2"): 
        if (userScore < abilityPrice) {
            notEnoughScore();
        } else {
            confirm.innerHTML = "Would you like to buy this ability?<br>";
            createButton("Yes", 50, ability, abilityPrice);
            createButton("No", 50);
        }
        break;
        case ("soap"):
            if (userScore < abilityPrice) {
                notEnoughScore();
            } else {
                confirm.innerHTML = "Would you like to buy this ability?<br>";
                createButton("Yes", 50, ability, abilityPrice);
                createButton("No", 75);
            }
            break;
        case ("liquidSoap"):
            if (userScore < abilityPrice) {
                notEnoughScore();
            } else {
                confirm.innerHTML = "Would you like to buy this ability?<br>";
                createButton("Yes", 50, ability, abilityPrice);
                createButton("No", 25);
            }
            break;
        case ("rubbingAlcohol"):
            if (userScore < abilityPrice) {
                notEnoughScore();
            } else {
                confirm.innerHTML = "Would you like to buy this ability?<br>";
                createButton("Yes", 50, ability, abilityPrice);
                createButton("No", 50);
            }
            break;
        case ("antiseptic"):
            if (userScore < abilityPrice) {
                notEnoughScore();
            } else {
                confirm.innerHTML = "Would you like to buy this ability?<br>";
                createButton("Yes", 50, ability, abilityPrice);
                createButton("No", 50);
            }
            break;
        case ("radiation"):
            if (userScore < abilityPrice) {
                notEnoughScore();
            } else {
                confirm.innerHTML = "Would you like to buy this ability?<br>";
                createButton("Yes", 50, ability, abilityPrice);
                createButton("No", 50);
            }
            break;
    }

    //let increment = firebase.firestore.FieldValue.increment(rate);

    function notEnoughScore() {
        confirm.innerHTMl = "You do not have enough score for this ability!<br>";
        createButton("Ok", 50);
    }

    function createButton(text, marginStart, ability, abilityPrice) {
        let button = document.createElement("button");
        button.setAttribute("id", "confirmButton");
        button.style.marginInlineStart = marginStart + "%";
        // Adds an event listener to buttons which have the ability param
        //      this makes it so that the ability is incremented by one when
        //      the button is clicked
        if (ability != undefined) {
            button.addEventListener("click", function (user) {
                firebase.auth().onAuthStateChanged(function (user) {
                    let plusOne = firebase.firestore.FieldValue.increment(1);
                    let scoreDecrease = firebase.firestore.FieldValue.increment(abilityPrice);
                    let userRef = db.collection('users').doc(user.uid);
                    let abilityName = ability.toString();
                    userRef.update({
                        abilityName: plusOne,
                        score: scoreDecrease
                    })
                })
            confirm.style.display = "none";
            }) 
        } else{
            button.addEventListener("click", function(){
                confirm.style.display = "none";
            })
        }
        button.innerHTML = text;

        confirm.appendChild(button);
    }
}

    
    gameStart();