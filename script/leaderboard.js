function updateLeaderBoard() {
    // Clear current scores.
    document.getElementById("leaderboard").innerHTML = "<tr><th>Name</th><th>Score</th></tr>";

    // Get the top 5 scores.
    db.collection("users").orderBy("clicks", "desc").limit(5).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById("leaderboard").innerHTML += "<tr>" +
                "<td>" + doc.data().name + "</td>" +
                "<td>" + doc.data().clicks + "</td>" +
                "</tr>";
        })
    })
}
window.onload = updateLeaderBoard;