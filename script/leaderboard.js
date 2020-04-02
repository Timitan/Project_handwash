<<<<<<< HEAD



function updateLeaderBoard() {
    // Clear current scores.
    document.getElementById("leaderboard").innerHTML = "<tr><th>Rank</th><th>Name</th><th>Health</th><th style='color:blue;font-size:large;'>Score</th></tr>";
    let i =1;
=======
function updateLeaderBoard() {
    // Clear current scores.
    document.getElementById("leaderboard").innerHTML = "<tr><th>Name</th><th>Score</th></tr>";

>>>>>>> 58e99d2a74304650a1bb4bdcc6b80dd8f9e834fd
    // Get the top 5 scores.
    db.collection("users").orderBy("clicks", "desc").limit(5).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById("leaderboard").innerHTML += "<tr>" +
<<<<<<< HEAD
               "<td>" + "#" + i + "</td>"+
                "<td>" + doc.data().name + "</td>" +
                "<td>" + doc.data().health + "</td>"+
                "<td>" + doc.data().clicks + "</td>" 
                "</tr>";
                i++;
=======
                "<td>" + doc.data().name + "</td>" +
                "<td>" + doc.data().clicks + "</td>" +
                "</tr>";
>>>>>>> 58e99d2a74304650a1bb4bdcc6b80dd8f9e834fd
        })
    })
}
window.onload = updateLeaderBoard;