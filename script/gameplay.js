// Global Variables
let healthValue = 100;
let healthDecreaseRate = 0.015;
let clickGainHealthRate = 0.85;

function toggleShop() {
    let shopMenu = document.getElementById("mySideNav")
    let height = shopMenu.style.width;
    let openValue = "45vh";
    let closedValue = "0vh";

    if (height == closedValue || height == "") {
        shopMenu.style.width = openValue;
    } else {
        shopMenu.style.width = closedValue;
    }
}

function incrementScore() {
    let scoreDisplay = document.getElementById("money-display");
    let money = scoreDisplay.innerHTML.slice(1);
    money++;
    scoreDisplay.innerHTML = "$ " + money;
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

function handClickEventHandler(){
    incrementScore();
    setHealth(clickGainHealthRate);
}

/* All the functions to be executed when the page is run.*/
function gameStart(){
    /* Decrease health bar at a constant rate*/
    let timerRate = 2;
    setInterval(function(){
        setHealth(-healthDecreaseRate);
    }, timerRate);

}


gameStart();