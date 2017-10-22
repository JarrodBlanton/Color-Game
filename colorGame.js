// Set initial number of squares to 6 - hard mode 
var numSqrs = 6;
// Grab all square divs
var squares = document.getElementsByClassName("square");
// Grab the element for the top of the page
var h1 = document.querySelector(".head h1");
var reset = false;
// Query Buttons
var resetButton = document.querySelector("#reset");
var feedback = document.querySelector("#feedback");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
// Goal Square values
var goalSquare = squares[randomSquare(numSqrs)];
var goalText = document.querySelector("#goal-color");

// Random math for choosing square
function randomSquare(max) {
    return Math.floor(Math.random() * max);
}

// Function to change colors when user picks correct color
function onWin(color) {
    for (var i = 0; i < numSqrs; i++) {
        squares[i].style.backgroundColor = color;
    }
    h1.style.backgroundColor = color;   
}

// Reset colors, goal square, and header style
function resetGame() {
    setColors(numSqrs);
    resetGoal();
    buttonColor = "steelblue";
    h1.style.backgroundColor = "steelblue";
    resetButton.textContent = "New Colors";
    feedback.textContent = "";       
}

// Redo goal square and change attributes
function resetGoal() {
    // Must remove old id
    goalSquare.removeAttribute("id");
    goalSquare = squares[randomSquare(numSqrs)];
    goalSquare.setAttribute("id", "goal-square");
    goalText.textContent = goalSquare.style.backgroundColor;
}

// function to assign each square a background color
function setColors(numSqrs) {
    // Assigns each square a random color
    for (var i = 0; i < numSqrs; i++) {  
        squares[i].style.backgroundColor = randomColor();
    }
};

// Some dumb stuff to give me a random color - returns string format
function randomColor() {
    var r = randomNum();
    var g = randomNum();
    var b = randomNum();
    return "rgb(" + r.toString() + ", " + g.toString() + ", " + b.toString() + ")";
}

// Extra math for randomization
function randomNum() {
    return Math.floor(Math.random() * (255 - 0 + 1));
}

// IIFE to add listeners to the window
(function init() {
    // Sets up the colors for the squares
    setColors(numSqrs);

   // Logic for assigning event listeners and functionality
    for (var i = 0; i < numSqrs; i++) {
        
        squares[i].addEventListener("click", function() {
            
            var clickedColor =  this.style.backgroundColor;

            if (clickedColor === goalSquare.style.backgroundColor){

                feedback.textContent = "Correct!";
                
                resetButton.textContent = "Play Again?";

                onWin(clickedColor);

            } else {

                feedback.textContent = "Try Again!";

                this.style.backgroundColor = "#232323";

            }
        });
    }

    // If user resets, reset the game
    resetButton.addEventListener("click", function() {
        resetGame();
    });

    goalSquare.setAttribute("id", "goal-square");

    goalText.textContent = goalSquare.style.backgroundColor;

    // Should refactor for more difficulties, but for now it's fine
    easyButton.addEventListener("click", function () {
        hardButton.classList.remove("selected");        
        easyButton.classList.add("selected");
        // Change number of squares to 3 and reset game
        numSqrs = 3;
        for (var i = 3; i < 6; i++) {
            squares[i].style.display = 'none';
        }
        resetGame();
    });

    hardButton.addEventListener("click", function () {
        easyButton.classList.remove("selected");        
        hardButton.classList.add("selected"); 
        // Change number of squares back to 6    
        numSqrs = 6;
        for (var i = 3; i < 6; i++) {
            squares[i].style.display = 'block';
        }
        resetGame();
    });
})();