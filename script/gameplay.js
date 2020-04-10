// ####################################################################
// Global Variables
// ####################################################################
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

// ####################################################################
// Displays the shop on the right side
// ####################################################################
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
                    rate: 3,
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

// ####################################################################
// When the user loses all of their health, then they lose all of their
// progress and must restart from the beginning
// ####################################################################
function loseTheGame(){
    // Sets the user's purchases and ability costs
    abilityCosts("ability1", changeAbilityCosts);
    abilityCosts("ability2", changeAbilityCosts);
    abilityCosts("ability3", changeAbilityCosts);
    abilityCosts("ability4", changeAbilityCosts);
    abilityCosts("ability5", changeAbilityCosts);
    abilityCosts("ability6", changeAbilityCosts);
    abilityCosts("ability7", changeAbilityCosts);

    // Displays the message
    let centerPiece = document.getElementById("displayMessage");
    document.getElementById("displayName").innerHTML = " You lost all of your HP.<br>Now you have to restart the game from the beginning.";
    centerPiece.style.background = "rgba(185, 185, 185, 0.75)";
    centerPiece.style.display = "block";
}

// ####################################################################
// Displays the health field within the database
// ####################################################################
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
// Displays the score on the top right and updates the field within the
// firebase
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

// ####################################################################
// Changes the health and clicks field within the database
// ####################################################################
function changeHealthVariable() {
    clickSound.play();
    firebase.auth().onAuthStateChanged(function (user) {
        setHealth(clickGainHealthRate);
        userID = firebase.auth().currentUser.uid;
        let userRef = db.collection('users').doc(user.uid);
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


// ####################################################################
// Event listener for whenever the hand is clicked
// ####################################################################
function setHandEventListener() {
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


// ####################################################################
// Creates new gerns to be displayed around the hand
// ####################################################################
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

// ####################################################################
// Removes the last germ in the array from th document
// ####################################################################
function removeGerm() {
    let elementArray = Array.from(document.getElementById("germContainer").children);
    if (elementArray.length != 0) {
        let element = elementArray[elementArray.length - 1]
        document.getElementById(element.id).remove();
    }
}

// ####################################################################
// Creates the initial germs to be displayed on the screen
// ####################################################################
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
    // Sets the user's purchases and ability costs
    abilityCosts("ability1", changeAbilityCosts);
    abilityCosts("ability2", changeAbilityCosts);
    abilityCosts("ability3", changeAbilityCosts);
    abilityCosts("ability4", changeAbilityCosts);
    abilityCosts("ability5", changeAbilityCosts);
    abilityCosts("ability6", changeAbilityCosts);
    abilityCosts("ability7", changeAbilityCosts);
}


// ####################################################################
// Functions to show costs of different abilities
// ####################################################################
function abilityCosts(ability, callback) {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users/").doc(user.uid).get().then(function (d) {
            // Gets all of the user's amount of abiliites owned
            let ability1 = d.data()["ability1"];
            let ability2 = d.data()["ability2"];
            let ability3 = d.data()["ability3"];
            let ability4 = d.data()["ability4"];
            let ability5 = d.data()["ability5"];
            let ability6 = d.data()["ability6"];
            let ability7 = d.data()["ability7"];
            // Checks which ability has been selected
            // Callback function for when the user logs back in again
            switch (ability) {
                case ("ability1"):
                    if (ability1 == 0) {
                        currentAbilityCost = 150;
                        currentAbilityNewCost = (Math.ceil(150 * Math.pow(1.15, ability1)));
                        currentAbilityOwned = 1;
                    } else {
                        currentAbilityCost = (Math.ceil(150 * Math.pow(1.15, ability1)));
                        currentAbilityNewCost = (Math.ceil(150 * Math.pow(1.15, (ability1 + 1))));
                        currentAbilityOwned = ability1 + 1;
                        if (callback != undefined){
                            currentAbilityOwned = ability1;
                            if (callback != undefined) {
                                callback("firstAbilityOwned", "firstAbilityCost");
                            }
                        }
                    }
                    break;
                case ("ability2"):
                    if (ability2 == 0) {
                        currentAbilityCost = 1000;
                        currentAbilityNewCost = (Math.ceil(1000 * Math.pow(1.15, ability2)));
                        currentAbilityOwned = 1;
                    } else {
                        currentAbilityCost = (Math.ceil(1000 * Math.pow(1.15, ability2)));
                        currentAbilityNewCost = (Math.ceil(1000 * Math.pow(1.15, (ability2 + 1))));
                        currentAbilityOwned = ability2 + 1;
                        if (callback != undefined) {
                            currentAbilityOwned = ability2;
                            callback("secondAbilityOwned", "secondAbilityCost");
                        }
                    }
                    break;
                case ("ability3"):
                    if (ability3 == 0) {
                        currentAbilityCost = 11000;
                        currentAbilityNewCost = (Math.ceil(11000 * Math.pow(1.15, ability3)));
                        currentAbilityOwned = 1;
                    } else {
                        currentAbilityCost = (Math.ceil(11000 * Math.pow(1.15, ability3)));
                        currentAbilityNewCost = (Math.ceil(11000 * Math.pow(1.15, (ability3 + 1))));
                        currentAbilityOwned = ability3 + 1;
                        if (callback != undefined) {
                            currentAbilityOwned = ability3;
                            callback("thirdAbilityOwned", "thirdAbilityCost");
                        }
                    }
                    break;
                case ("ability4"):
                    if (ability4 == 0) {
                        currentAbilityCost = 12000;
                        currentAbilityNewCost = (Math.ceil(120000 * Math.pow(1.15, ability4)));
                        currentAbilityOwned = 1;
                    } else {
                        currentAbilityCost = (Math.ceil(120000 * Math.pow(1.15, ability4)));
                        currentAbilityNewCost = (Math.ceil(120000 * Math.pow(1.15, (ability4 + 1))));
                        currentAbilityOwned = ability4 + 1;
                        if (callback != undefined) {
                            currentAbilityOwned = ability4;
                            callback("fourthAbilityOwned", "fourthAbilityCost");
                        }
                    }
                    break;
                case ("ability5"):
                    if (ability5 == 0) {
                        currentAbilityCost = 1300000;
                        currentAbilityNewCost = (Math.ceil(1300000 * Math.pow(1.15, ability5)))
                        currentAbilityOwned = 1;
                    } else {
                        currentAbilityCost = (Math.ceil(1300000 * Math.pow(1.15, ability5)));
                        currentAbilityNewCost = (Math.ceil(1300000 * Math.pow(1.15, (ability5 + 1))));
                        currentAbilityOwned = ability5 + 1;
                        if (callback != undefined) {
                            currentAbilityOwned = ability5;
                            callback("fifthAbilityOwned", "fifthAbilityCost");
                        }
                    }
                    break;
                case ("ability6"):
                    if (ability6 == 0) {
                        currentAbilityCost = 14000000;
                        currentAbilityNewCost = (Math.ceil(14000000 * Math.pow(1.15, ability6)));
                        currentAbilityOwned = 1;
                    } else {
                        currentAbilityCost = (Math.ceil(14000000 * Math.pow(1.15, ability6)));
                        currentAbilityNewCost = (Math.ceil(14000000 * Math.pow(1.15, (ability6 + 1))));
                        currentAbilityOwned = ability6 + 1;
                        if (callback != undefined) {
                            currentAbilityOwned = ability6;
                            callback("sixthAbilityOwned", "sixthAbilityCost");
                        }
                    }
                    break;
                case ("ability7"):
                    if (ability7 == 0) {
                        currentAbilityCost = 200000000;
                        currentAbilityNewCost = (Math.ceil((200000000 * Math.pow(1.15, ability7))));
                        currentAbilityOwned = 1;
                    } else {
                        currentAbilityCost = (Math.ceil((200000000 * Math.pow(1.15, ability7))));
                        currentAbilityNewCost = (Math.ceil(200000000 * Math.pow(1.15, (ability7 + 1))));
                        currentAbilityOwned = ability7 + 1;
                        if (callback != undefined) {
                            currentAbilityOwned = ability7;
                            callback("seventhAbilityOwned", "seventhAbilityCost");
                        }
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
    abilityCosts(ability);
    let confirm = document.getElementById("abilityConfirm");
    //createButton("No", 50, 50, "red");
    confirm.style.width = "100vw";
    confirm.style.height = "50vh";
    confirm.style.display = "inline";
    confirm.style.zIndex = "2";
    // Timeout so database can complete the abilityCosts function
    // and get the values
    setTimeout(function(){
        // Checks which ability has been clicked
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
                    createButton("Yes", 5, ability, currentAbilityCost);
                    createButton("No", 25);
                }
                break;
            case ("ability3"):
                if (userScore < currentAbilityCost) {
                    confirm.innerHTML = "You do not have enough score to buy this ability<br>";
                    createButton("Ok");
                } else {
                    confirm.innerHTML = "Would you like to buy this ability?<br>";
                    createButton("Yes", 5, ability, currentAbilityCost);
                    createButton("No", 25);
                }
                break;
            case ("ability4"):
                if (userScore < currentAbilityCost) {
                    confirm.innerHTML = "You do not have enough score to buy this ability<br>";
                    createButton("Ok");
                } else {
                    confirm.innerHTML = "Would you like to buy this ability?<br>";
                    createButton("Yes", 5, ability, currentAbilityCost);
                    createButton("No", 25);
                }
                break;
            case ("ability5"):
                if (userScore < currentAbilityCost) {
                    confirm.innerHTML = "You do not have enough score to buy this ability<br>";
                    createButton("Ok");
                } else {
                    confirm.innerHTML = "Would you like to buy this ability?<br>";
                    createButton("Yes", 5, ability, currentAbilityCost);
                    createButton("No", 25);
                }
                break;
            case ("ability6"):
                if (userScore < currentAbilityCost) {
                    confirm.innerHTML = "You do not have enough score to buy this ability<br>";
                    createButton("Ok");
                } else {
                    confirm.innerHTML = "Would you like to buy this ability?<br>";
                    createButton("Yes", 5, ability, currentAbilityCost);
                    createButton("No", 25);
                }
                break;
            case ("ability7"):
                if (userScore < currentAbilityCost) {
                    confirm.innerHTML = "You do not have enough score to buy this ability<br>";
                    createButton("Ok");
                } else {
                    confirm.innerHTML = "Would you like to buy this ability?<br>";
                    createButton("Yes", 5, ability, currentAbilityCost);
                    createButton("No", 25);
                }
                break;
        }
    }, 200);
  
}


// ####################################################################
// Function to change the ability costs and owned according to the
// user's purchases when game starts
// ####################################################################
function changeAbilityCosts(ability, abilityCost){
    document.getElementById(ability).innerHTML = "Owned: " + currentAbilityOwned;
    document.getElementById(abilityCost).innerHTML = currentAbilityCost;
}

// ####################################################################
// Function to change the abilities costs and owned when an ability 
// is bought.
// ####################################################################
function changeAbilityNewCosts(ability, abilityCost){
    document.getElementById(ability).innerHTML = "Owned: " + currentAbilityOwned;
    document.getElementById(abilityCost).innerHTML = currentAbilityNewCost;
}

// ####################################################################
// Creates the Yes, No, and Ok buttons when the user tries to buy an
// ability within the shop
// ####################################################################
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
                let fieldVal = firebase.firestore.FieldValue;
                let userRef = db.collection('users').doc(user.uid);
                // Checks which ability has been clicked
                switch (ability) {
                    case ("ability1"):
                        changeAbilityNewCosts("firstAbilityOwned", "firstAbilityCost");
                        userRef.update({
                            ability1: plusOne,
                            score: scoreDecrease,
                            rate: fieldVal.increment(1)
                        });
                        break;
                    case ("ability2"):
                        changeAbilityNewCosts("secondAbilityOwned", "secondAbilityCost");
                        userRef.update({
                            ability2: plusOne,
                            score: scoreDecrease,
                            rate: fieldVal.increment(10)
                        });
                        break;
                    case ("ability3"):
                        changeAbilityNewCosts("thirdAbilityOwned", "thirdAbilityCost");
                        userRef.update({
                            ability3: plusOne,
                            score: scoreDecrease,
                            rate: fieldVal.increment(80)
                        });
                        break;
                    case ("ability4"):
                        changeAbilityNewCosts("fourthAbilityOwned", "fourthtAbilityCost");
                        userRef.update({
                            ability4: plusOne,
                            score: scoreDecrease,
                            rate: fieldVal.increment(470)
                        });
                        break;
                    case ("ability5"):
                        changeAbilityNewCosts("fifthAbilityOwned", "fifthAbilityCost");
                        userRef.update({
                            ability5: plusOne,
                            score: scoreDecrease,
                            rate: fieldVal.increment(14000)
                        });
                        break;
                    case ("ability6"):
                        changeAbilityNewCosts("sixthAbilityOwned", "sixthAbilityCost");
                        userRef.update({
                            ability6: plusOne,
                            score: scoreDecrease,
                            rate: fieldVal.increment(78000)
                        });
                        break;
                    case ("ability7"):
                        changeAbilityNewCosts("seventhAbilityOwned", "seventhAbilityCost");
                        userRef.update({
                            ability7: plusOne,
                            score: scoreDecrease,
                            rate: fieldVal.increment(440000)
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