Bacteria Cafeteria

General info
Technologies
Contents


> General Info
  This browser based web application / game tracks the germs killed by user everytime he/she plays this game reflecting their hand washing habits. First the user must login. 
  Then multiple germs appear on the hand which they can kill by clicking on them. This project demonstrates:

  read and write to firestore, a non-sql database
  use of firebase authentication and creation of a users collection in firestore
  customized user experience after login/signup
  tracking of a data point provided by the user
  display of a user's history of events
  use of navbar in boostrap


> Technologies
  Technologies that were used for this project:

  Firebase Hosting
  Firebase Firestore Database
  HTML, CSS
  JavaScript
  Bootstrap
  
> Contents
  Content of the project folder:

 Top level of project folder: 
 .gitignore               # Git ignore file
 404.html                 # File for error
 index.html               # landing HTML file, this is what users see when you come to url
 login.html               # login HTML file, contains logic for user authentication
 main.html                # after logged in, you can add cups, and see history here
 stats.html		  # page that shows your statistics	
 leaderboard.html 	  # page that shows your position among other users of the app	
 gameinfo.html	          # Gives the description of the game  and how to play it.  
 README.txt		  # Shows the summary and contents of projects	

It has the following subfolders:
├── .firebase                # Folder for firebase
├── .git                     # Folder for git repo
├── images                   # Folder for images
├── scripts                  # Folder for scripts
    /scripts.js              # This is where all the core functions are located
├── styles                   # Folder for styles

Firebase hosting files: 
├── .firebaserc              # Firebase file
├── firebase.json            # Firebase file
├── firestore.indexes.json   # Firebase file
├── firestore.rules          # Rules for read/write to firestore


Tips for file naming:

user lowercase with no spaces
use dashes (not underscore) for word separation