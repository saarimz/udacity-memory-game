# Memory Game

## Introduction
This a simple object oriented implementation of the memory card game for Udacity's [Front End Web Developer Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001). 

## Overview
The user's goal is to match all the cards in the 4x4 grid. There are 8 different pairs, totalling 16 cards, distributed at random, on the grid. All the cards are face-down. When the user selects a pair, the program will check to see if there's a match. If there is, the program will keep those cards face up and the user continues to find the next pair. If there is no match the cards will return to their original face-down position. Furthermore, the system is tracking the player's moves and assigning a star-rating to the user based on the number of moves they have made.

## How to play?
You can play the game by going [here](http://www.saarimzaman.com/udacity-memory-game/).

## Installation
Clone the GitHub repository or download the project as a zip file. All the required libraries are delivered via CDNs so that there is no extra installation necessary. Just open up index.html, app.js, and app.css in your code editor and start writing code.

## Issues, known bugs, and areas with room for Improvement
1. The project is not optimized for mobile. There will be overflow on mobile due to a lack of responsiveness.
2. The `newGame()` function and the `restart` feature are written in JQuery. Switching to vanilla js would reduce the number of dependencies and size of the project, thereby improving performance.
3. There could be additional CSS animations implemented to signify that cards do not match.
4. There is a lot of repeated code to set `window.lastElementClicked`, and therefore the code isn't DRY.

## Additional links:
[Udacity project rubric](https://review.udacity.com/#!/rubrics/591/view)

