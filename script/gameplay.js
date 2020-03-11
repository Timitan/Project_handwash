function toggleShop() {
    let shopMenu = document.getElementById("mySideNav")
    let height = shopMenu.style.height;
    let openHeight = "45vh";
    let closedHeight = "0vh";

    if (height == closedHeight || height == "") {
        shopMenu.style.height = openHeight;
    } else {
        shopMenu.style.height = closedHeight;
    }
}

function incrementScore() {
    let scoreDisplay = document.getElementById("money-display");
    let money = scoreDisplay.innerHTML.slice(1);
    money++;
    scoreDisplay.innerHTML = "$ " + money;
<<<<<<< HEAD
}

=======
}
>>>>>>> 372778e82b20298a623bb20970f796e9c6c8e317
