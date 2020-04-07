# Project_handwash
> Project handwash is a web-based game that shows the dangers of germs in a fun and interactive way.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
* [Content](#content)
* [Inspiration](#inspiration)

## General Info

Project handwash is a game that shows some of the effects and behaviors of germs that may come into contact with your hand. It's purpose
is to give a reminder to users that washing their hands frequently can help to prevent any sickness or infection.

How it works is by visualizing those germs that may come into contact with the user's hand. In the game, germs will be created on the
hand over time and it's the user's job to get rid of them. If there are too many germs on the hand at one point, the user would supposedly
get "sick" and they would lose the game. 

Germs would also be created whether or not the user had the game open or not. This would incentivize coming back to the game once in a
while to clean up their hand. Doing so would hopefully show the user how important it is to wash their hands.

## Technologies
Technologies that were used for this project:

- Firebase Hosting
- Firebase Firestore Database
- HTML, CSS
- JavaScript
- Bootstrap

## Features
List of features:
- Statistics
- Leaderboard
- Timer for creating germs
- Shop upgrades
- Reset functions
- Login and signup implementation

## Content
Organization and structure of files:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file
├── login.html               # login HTML file, contains logic for user authentication
├── main.html                # After logged in, play the game on this page
├── stats.html               # After logged in, see statistics here
├── leaderboard.html         # After logged in, see the leaderboard here
└── README.md

Contains the following subfolders:
├── images                   # Folder for images
├── sounds                   # Folder for sounds
├── script                   # Folder for scripts
    /firebase_api.js         # Firebase file
    /gameplay.js             # All main gameplay functions involving the main page
    /leaderboard.js          # Users firebase to display a leaderboard
    /stats.js                # Uses firebase to display tracked user statistics
    /user-customize.js        # Functions involving a more personalized experience for the user
├── style                    # Folder for styles
    /landing-page.css        # Styling for the landing page
    /leaderboard.css         # Styling for the leaderboard page
    /login-page.css          # Styling for the login page
    /main-page.css           # Styling for the main page
    /statspage.css           # Styling for the statistics page
    
``` 
   
## Inspiration

This game was largely influenced by Cookie Clicker and other variants of clicking games.
