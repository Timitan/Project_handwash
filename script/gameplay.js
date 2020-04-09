// Global Variables
let healthValue = 100;
let healthDecreaseRate = 1;
let clickGainHealthRate = 1;
let globalRate = 1;
let clickSound = new Audio("../sounds/hand_click.mp3");
let germArray = [];
let userScore;
let userID;
let currentAbilityCost;
let currentRateIncrease;
let currentAbilityNewCost;
let currentAbilityOwned;

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
        shopBtn.style.opacity = "0.8";
    } else {
        shopMenu.style.width = closedValue;
        shopBtn.style.right = closedValue;
        shopBtn.style.opacity = "1";
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
            if (healthValue <= 0) {
                loseTheGame();
                userRef.update({
                    clicks: 0,
                    score: 0,
                    rate: 1,
                    health: 100,
                    ability1: 0,
                    ability2: 0,
                    ability3: 0,
                    ability4: 0,
                    ability5: 0,
                    ability6: 0,
                    ability7: 0,
                });
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
function loseTheGame(){
    let centerPiece = document.getElementById("displayMessage");
    centerPiece.style.display = "block";
    //document.getElementById("closeButton").style.display = "inline";
    centerPiece.innerHTML = "You lost all of your HP.<br>Now you have to restart the game from the beginning.";
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
                globalRate = y;
                let scoreDisplay = document.getElementById("money-display");
                scoreDisplay.innerHTML = "$ " + x;
            });
    });
}

function changeHealthVariable() {
    clickSound.play();
    firebase.auth().onAuthStateChanged(function (user) {
        setHealth(clickGainHealthRate);
        userID = firebase.auth().currentUser.uid;
        let userRef = db.collection('users').doc(user.uid);
        //userID = userRef;
        /////Plays the sound/////
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
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    });
}

function setHandEventListener() {
    // Adds an event listener to the hand when it is clicked
    document.getElementById("hand").addEventListener("mousedown", function () {
        removeGerm();
        changeHealthVariable();
    });
}

// ####################################################################
// Functions related to germ visuals and its functionality
// ####################################################################

// Creates a germ object
function Germ(xPos, yPos, index) {
    this.germObj = document.createElement("img");
    this.div = document.createElement("div");
    this.xPos = xPos;
    this.yPos = yPos;

    // Creates an id from 0 - 100
    this.germObj.id = "germImg" + index;
    this.germObj.src = "images/germ.gif";

    // Creates a div to put the germs in
    this.div.id = index + "div";
    this.div.style.position = "absolute";
    this.div.style.width = "100%";
    this.div.style.height = "100%";

    document.getElementById("germContainer").appendChild(this.div);
    document.getElementById(this.div.id).appendChild(this.germObj);

    this.germObj.style.position = "relative";
    this.germObj.style.width = "90px";
    this.germObj.style.zIndex = 1;
    this.germObj.style.transition = "3s";

    this.germObj.onclick = function () {
        let parentNode = this.parentNode.id;
        document.getElementById(this.id).remove();
        document.getElementById(parentNode).remove();
        changeHealthVariable();
    }

    // Creates a move function for the germs
    this.moveGerm = function (germObj) {
        let containerWidth = document.getElementById("germContainer").offsetWidth;
        let containerHeight = document.getElementById("germContainer").offsetHeight;

        // Sets x positioning based on relative positioning
        let x = Math.random() * containerWidth - containerWidth / 2;

        // Offset container height so germs don't overlap with healthbar
        let y = Math.random() * containerHeight - 50;

        germObj.style.top = y + "px";
        germObj.style.left = x + "px";

        setInterval(function () {
            let containerWidth = document.getElementById("germContainer").offsetWidth;
            let containerHeight = document.getElementById("germContainer").offsetHeight;

            let x = Math.random() * containerWidth - containerWidth / 2;
            let y = Math.random() * containerHeight - 50;

            germObj.style.top = y + "px";
            germObj.style.left = x + "px";
        }, 3000);
    }

    this.moveGerm(this.germObj, this.div.id);
}


function createGerms(num) {
    let elementArray = Array.from(document.getElementById("germContainer").children);

    // Create containers based on the last index, prevents killing multiple germs per click
    startIndex = 0;
    if (elementArray.length != 0) {
        let lastElementId = elementArray[elementArray.length - 1].id;
        startIndex = parseInt(lastElementId) + 1;
        console.log(startIndex);
    }

    let containerWidth = document.getElementById("germContainer").offsetWidth / 6;
    let containerHeight = document.getElementById("germContainer").offsetHeight / 2;

    // Create 5 germs per 10 seconds
    for (let i = startIndex; i < num + startIndex; i++) {
        // Place within the dimensions of the hand
        let x = Math.random() * containerWidth;
        let y = Math.random() * containerHeight;

        let germ = new Germ(x, y, i);
        germArray.push(germ);
    }
}

// Remove the last germ element in the array from the document
function removeGerm() {
    let elementArray = Array.from(document.getElementById("germContainer").children);
    if (elementArray.length != 0) {
        let element = elementArray[elementArray.length - 1]
        document.getElementById(element.id).remove();
    }
}

// Creates the germs initially there on startup
function createInitialGerms() {
    let germCount = 0;
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("users/").doc(user.uid)
                .get().then(function (doc) {
                    console.log("Document data:", doc.data());
                    germCount = doc.data().health;
                    console.log("Health:" + germCount);
                    germCount = 100 - germCount;
                    createGerms(germCount);
                    console.log("GermCount:" + germCount);
                })
                .catch(function (error) {
                    console.log("Error getting document:", error);
                });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    })
}



// ####################################################################
// Functions to call when opening webpage
// ####################################################################

/* All the functions to be executed when the page is run.*/
function gameStart() {
    /* Decrease health bar at a constant rate*/
    let timerRate = 15000;
    setInterval(function () {
        setHealth(-healthDecreaseRate);

        if (healthValue > 0) {
            createGerms(1);
        }
    }, timerRate);

    displayScore();
    displayHealth();
    setHandEventListener();
}


// ####################################################################
// Functions to show costs of different abilities
// ####################################################################
function abilityCosts(ability, cost) {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users/").doc(user.uid).get().then(function (d) {
                let ability1 = d.data()["ability1"];
                let ability2 = d.data()["ability2"];
                let ability3 = d.data()["ability3"];
                let ability4 = d.data()["ability4"];
                let ability5 = d.data()["ability5"];
                let ability6 = d.data()["ability6"];
                let ability7 = d.data()["ability7"];
                switch (ability) {
                    case ("ability1"):
                        if (ability1 == 0) {
                            currentAbilityCost = 15;
                            currentAbilityNewCost = (Math.ceil(15 * Math.pow(1.15, ability1)));
                            currentAbilityOwned = 1;
                        } else {
                            currentAbilityCost = (Math.ceil(15 * Math.pow(1.15, ability1)));
                            currentAbilityNewCost = (Math.ceil(15 * Math.pow(1.15, (ability1 + 1))));
                            currentAbilityOwned = ability1 + 1;
                        }
                        break; 
                        case ("ability2"):
                            if (ability2 == 0) {
                                currentAbilityCost = 100;
                            } else {
                                currentAbilityCost = (Math.ceil(100 * Math.pow(1.15, ability2)));
                            }
                            break;
                            case ("ability3"):
                                if (ability3 == 0) {
                                    currentAbilityCost = 1100;
                                } else {
                                    currentAbilityCost = (Math.ceil(1100 * Math.pow(1.15, ability3)));
                                }
                                break;
                                case ("ability5"):
                                    if (ability4 == 0) {
                                        currentAbilityCost = 12000;
                                    } else {
                                        currentAbilityCost = (Math.ceil(12000 * Math.pow(1.15, ability4)));
                                    }
                                    break;
                                    case ("ability5"):
                                        if (ability5 == 0) {
                                            currentAbilityCost = 130000;
                                        } else {
                                            currentAbilityCost = (Math.ceil(130000 * Math.pow(1.15, ability5)));
                                        }
                                        case ("ability6"):
                                            if (ability6 == 0) {
                                                currentAbilityCost = 1400000;
                                            } else {
                                                currentAbilityCost = (Math.ceil(1400000 * Math.pow(1.15, ability6)));
                                            }
                                            break;
                                            case ("radiation"):
                                                if (ability7 == 0) {
                                                    currentAbilityCost = 20000000;
                                                } else {
                                                    currentAbilityCost = Math.ceil((20000000 * Math.pow(1.15, ability7)));
                                                }
                                                break;
                }
            });
    });
}



// ####################################################################
// Function  to buy abilities
// ####################################################################
function buyAbility(ability) {
    // this method isnt working yet
    // purchasing abilities only works once of the fields change cause i dont know how to set it up so it sets the userID on load
    // im using the firebase.auth().OnAuthChanged but i dont know a replacement for this
    abilityCosts(ability);
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
    setTimeout(function(){
        switch (ability) {
            case ("ability1"):
                if (userScore < currentAbilityCost) {
                    confirm.innerHTML = "You do not have enough score to buy this ability<br>";
                    createButton("Ok");
                } else if (currentAbilityCost < userScore) {
                    confirm.innerHTML = "Would you like to buy this ability?<br>";
                    createButton("Yes", 5, ability, currentAbilityCost);
                    createButton("No", 25);
                }
                break;
            case ("ability2"):
                if (userScore < currentAbilityCost) {
                    confirm.innerHTML = "You do not have enough score to buy this ability<br>";
                    createButton("Ok");
                } else {
                    confirm.innerHTML = "Would you like to buy this ability?<br>";
                    createButton("Yes", 10, ability, currentAbilityCost);
                    createButton("No", 50);
                }
                break;
            case ("ability3"):
                if (userScore < currentAbilityCost) {
                    confirm.innerHTML = "You do not have enough score to buy this ability<br>";
                    createButton("Ok");
                } else {
                    confirm.innerHTML = "Would you like to buy this ability?<br>";
                    createButton("Yes", 10, ability, currentAbilityCost);
                    createButton("No", 50);
                }
                break;
            case ("ability4"):
                if (userScore < currentAbilityCost) {
                    confirm.innerHTML = "You do not have enough score to buy this ability<br>";
                    createButton("Ok");
                } else {
                    confirm.innerHTML = "Would you like to buy this ability?<br>";
                    createButton("Yes", 10, ability, currentAbilityCost);
                    createButton("No", 50);
                }
                break;
            case ("ability5"):
                if (userScore < currentAbilityCost) {
                    confirm.innerHTML = "You do not have enough score to buy this ability<br>";
                    createButton("Ok");
                } else {
                    confirm.innerHTML = "Would you like to buy this ability?<br>";
                    createButton("Yes", 10, ability, currentAbilityCost);
                    createButton("No", 50);
                }
                break;
            case ("ability6"):
                if (userScore < currentAbilityCost) {
                    confirm.innerHTML = "You do not have enough score to buy this ability<br>";
                    createButton("Ok");
                } else {
                    confirm.innerHTML = "Would you like to buy this ability?<br>";
                    createButton("Yes", 50, ability, currentAbilityCost);
                    createButton("No", 50);
                }
                break;
            case ("ability7"):
                if (userScore < currentAbilityCost) {
                    confirm.innerHTML = "You do not have enough score to buy this ability<br>";
                    createButton("Ok");
                } else {
                    confirm.innerHTML = "Would you like to buy this ability?<br>";
                    createButton("Yes", 50, ability, currentAbilityCost);
                    createButton("No", 50);
                }
                break;
        }
    }, 200);
  
}

    //let increment = firebase.firestore.FieldValue.increment(rate);
function createButton(text, marginStart, ability) {
    let confirm = document.getElementById("abilityConfirm");
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
                let scoreDecrease = firebase.firestore.FieldValue.increment(currentAbilityCost * -1);
                let userRef = db.collection('users').doc(user.uid);
                switch (ability) {
                    case ("ability1"):
                        document.getElementById("firstAbilityCost").innerHTML = currentAbilityNewCost;
                        document.getElementById("firstAbilityOwned").innerHTML = "Owned: " + currentAbilityOwned;
                        userRef.update({
                            ability1: plusOne,
                            score: scoreDecrease,
                            rate: plusOne
                        });
                        break;
                    case ("ability2"):
                        userRef.update({
                            ability2: plusOne,
                            score: scoreDecrease
                        });
                        break;
                    case ("ability3"):
                        userRef.update({
                            ability3: plusOne,
                            score: scoreDecrease
                        });
                        break;
                    case ("ability4"):
                        userRef.update({
                            ability4: plusOne,
                            score: scoreDecrease
                        });
                        break;
                    case ("ability5"):
                        userRef.update({
                            ability5: plusOne,
                            score: scoreDecrease
                        });
                        break;
                    case ("ability6"):
                        userRef.update({
                            ability6: plusOne,
                            score: scoreDecrease
                        });
                        break;
                    case ("ability7"):
                        userRef.update({
                            ability7: plusOne,
                            score: scoreDecrease
                        });
                        break;
                }
            });
            confirm.style.display = "none";
            confirm.innerHTML = "";

        });
    } else {
        button.addEventListener("click", function () {
            confirm.style.display = "none";
            confirm.innerHTML = "";
        })
    }
    button.innerHTML = text;

    confirm.appendChild(button);
}
gameStart();