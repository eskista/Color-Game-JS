// 6 colors display when page loads, but can change number of colors after loading (easy/hard level)
var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");


init();

function init() {
    setupModeButtons();
    setupSquares();
    reset();
}
  
function setupModeButtons() {
    // loope modebuttons (very important if we want to change mode in future)
    for (var i = 0; i < modeButtons.length; i++) {
        // modebuttons eventListners
        modeButtons[i].addEventListener("click", function () {
            //    removing the blue background from easy/hard levels (css effect from both button)
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            // Then, adding the blue css effect on the level that is clicked
            this.classList.add("selected");
            // Determining number of squares according to mode selection(3 for easy and 6 for hard mode)
            if (this.textContent === "Easy") {
                numSquares = 3;
            } else {
                numSquares = 6;
            }
            reset();
        });

    }
}

function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        // square listeners
        squares[i].addEventListener("click", function () {
            // grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            // compare each color of square to pickedColor
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                // calling changeColor function and passing the clickedColor variable
                // to change colors of all squares to the correct color
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;

            } else {
                // fade out the color to black background color once wrong color is clicked
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again!";
            }

        });
    }
}
    function reset() {
        // generate all new clolors
        colors = generateRandomColors(numSquares);
        // pick radom color from Array
        pickedColor = selectColor();
        //    change color display to match picked color
        colorDisplay.textContent = pickedColor;

        // Note! Because we are inside reset eventlistener function
        // we can also use this.textContent = "New Colors";
        resetButton.textContent = "New Colors";
        // when "play again"(which is actaully the reset button)
        //  is clicked, dont show "correct" message
        messageDisplay.textContent = "";
        // change colors of squares to random colors displayed on colorDisplay
        for (var i = 0; i < squares.length; i++) {
            // if there is color to select from array, give square color from array
            if (colors[i]) {
                //    first show/bring back all six squares
                squares[i].style.display = "block";
                // Then, give them color from array
                squares[i].style.backgroundColor = colors[i];
            } else {
                //    if no color available to select, dont display square
                squares[i].style.display = "none";
            }

        }
        h1.style.backgroundColor = "steelblue";
    }

    resetButton.addEventListener("click", function () {
        reset();
    })

    function changeColors(uniformColors) {
        // loop through all squares
        for (var i = 0; i < squares.length; i++) {
            //  change each square color to match the picked/correct color
            squares[i].style.backgroundColor = uniformColors;
        }

    };

    // function to select random color from the list of color arrays above
    function selectColor() {
        var radndomColors = Math.floor(Math.random() * colors.length)
        return colors[radndomColors];
    }

    function generateRandomColors(num) {
        //  create an Array
        var arr = [];
        //  repeat num times (loop through num times)
        for (var i = 0; i < num; i++) {
            //  get random color and push into array
            arr.push(radndomColor());
        }
        //  return that` array
        return arr;
    }

    function radndomColor() {
        //   pick a red from 0 to 255
        var r = Math.floor(Math.random() * 256);
        //   pick a green  from 0 to 255
        var g = Math.floor(Math.random() * 256);
        //   pick a blue from 0 to 255
        var b = Math.floor(Math.random() * 256);
        // synthesizing the above into the "rgb(r, g, b)" format
        // note! we added a spave after comma below because that is how css puts colors
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }

