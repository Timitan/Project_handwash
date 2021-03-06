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

Germs would also be created even if the user had the game closed. This would incentivize coming back to the game once in a
while to clean up their hand. Doing so would hopefully create a constant reminder for the user to wash their hands both in the game and in the real world.

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
└── gameinfo.html            # See game rules here         
└── 404.html                 # Page to redirect to when there is an error     
└── README.md

Contains the following subfolders:
├── images                   # Folder for images
    /antiseptic.png          # Image for antiseptic upgrade
    /bg.png                  # Image for the background
    /faucet.png              # Image of the faucet for the water upgrade
    /germ.gif                # Image of the germs on the main page
    /hand.png                # Image of the hand on the landing page
    /hand2.png               # Image of the hand on the main page
    /handSanitizer.jpg       # Image of the hand sanitizer upgrade
    /handicon.png            # Image of a hand icon
    /liquidSoap.png          # Image for the liquid soap upgrade
    /radiation.png	     # Image for the radiation upgrade
    /rubbingAlcohol.png      # Image for the rubbing alcohol upgrade
    /shop.png                # Image for the shop button icon
    /soap.jpeg               # Image for the bar soap upgrade
    /soap.jpg                # Image for the bar soap upgrade
	/radiation.png			 # Image of the radiation bottle upgrade		
├── research                 # Folder for the research in the upgrade descriptions
    /Handwashing_Facts.docx  # A Document for the research done
├── sounds                   # Folder for sounds
    /hand_click.mp3          # Sound that plays when the hand is clicked
├── script                   # Folder for scripts
    /firebase_api.js         # Firebase file
    /gameplay.js             # All main gameplay functions involving the main page
    /leaderboard.js          # Users firebase to display a leaderboard
    /stats.js                # Uses firebase to display tracked user statistics
    /user-customize.js       # Functions involving a more personalized experience for the user
├── style                    # Folder for styles
    /landing-page.css        # Styling for the landing page
    /leaderboard.css         # Styling for the leaderboard page
    /login-page.css          # Styling for the login page
    /main-page.css           # Styling for the main page
    /statspage.css           # Styling for the statistics page
    
``` 
   
## Inspiration

This game was largely influenced by Cookie Clicker and other variants of clicking games.
