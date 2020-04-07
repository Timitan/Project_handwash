// ####################################################################
// Functions to show LEADERBOARD
// ####################################################################
function updateLeaderBoard() {
    // Clear current scores.
    document.getElementById("leaderboard").innerHTML = "<thead class='thead-light'><tr><th>Rank</th><th>Name</th><th>Health</th><th style='font-size:large;'>Score</th></tr>";
    let i = 1;
    // Get the top 5 scores.
    db.collection("users").orderBy("clicks", "desc").limit(15).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById("leaderboard").innerHTML += "<tr>" +
                "<td>" + "#" + i + "</td>" +
                "<td>" + doc.data().name + "</td>" +
                "<td>" + doc.data().health + "</td>" +
                "<td>" + doc.data().score + "</td>"
            "</tr>";
            i++;
        })
    })
}
window.onload = updateLeaderBoard;