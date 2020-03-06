function toggleShop(){
    let shopMenu = document.getElementById("mySideNav")
    let height = shopMenu.style.height;
    let openHeight = "45vh";
    let closedHeight = "0vh";

    if(height == closedHeight  || height == ""){    
        shopMenu.style.height = openHeight;
    } else {
        shopMenu.style.height = closedHeight;
    }
}