


function updateLeaderBoard() {
    // Clear current scores.
    document.getElementById("leaderboard").innerHTML = "<tr><th>Rank</th><th>Name</th><th>Health</th><th style='color:blue;font-size:large;'>Score</th></tr>";
    let i =1;
    // Get the top 5 scores.
    db.collection("users").orderBy("clicks", "desc").limit(5).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById("leaderboard").innerHTML += "<tr>" +
               "<td>" + "#" + i + "</td>"+
                "<td>" + doc.data().name + "</td>" +
                "<td>" + doc.data().health + "</td>"+
                "<td>" + doc.data().clicks + "</td>" 
                "</tr>";
                i++;
        })
    })
}
window.onload = updateLeaderBoard;