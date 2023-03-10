var rows = 16; // Sets the size of the matrix
var columns = 16;

var isMouseDown = false; // Tracks if the mouse pressed (need to draw)

let ledBrightness = 6;
let paintColor = '#ffffff'; // The color that picked to paint
let paintColorR = 255; // The color that picked to paint in RGB
let paintColorG = 255;
let paintColorB = 255;

const rootStyles = document.documentElement.style;

// Create the table
for (var i = 10; i < rows + 10; i++) {
    document.write("<tr>");
    for (var j = 10; j < columns + 10; j++) {
        document.write(`<td id="c${i}${j}" class="blankCell"><div class="cellBlankDiv cell-div"></div></td>`);
    }
}


// DRAW ON THE DABLE
// Paint the cells where the mouse is pressed
// Add event listeners to each cell
// Sets isMouseDown to true when mouse pressed
var cells = document.getElementsByTagName("td");
for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("mousedown", function() {
        isMouseDown = true;
        var div = this.getElementsByTagName("div")[0];

        if (paintColor == '') {
            div.style.boxShadow = '0 0 0px 0px' + paintColor;
            div.style.backgroundColor = paintColor;
        } else {
            div.style.boxShadow = '0 0 ' + ledBrightness + 'px ' + ledBrightness + 'px' + paintColor;
            div.style.backgroundColor = paintColor;
        }

        //console.log("Started paint")
        //console.log(this);
    });
    cells[i].addEventListener("mouseover", function() {
        if (isMouseDown) {
            var div = this.getElementsByTagName("div")[0];

            if (paintColor == '') {
                div.style.boxShadow = '0 0 0px 0px' + paintColor;
                div.style.backgroundColor = paintColor;
            } else {
                div.style.boxShadow = '0 0 ' + ledBrightness + 'px ' + ledBrightness + 'px' + paintColor;
                div.style.backgroundColor = paintColor;
            }

            //console.log(this);
        }
    });
}

// Sets isMouseDown to false when mouse released
var table = document.getElementsByTagName("table")[0];
table.addEventListener("mouseup", function() {
    isMouseDown = false;
});
table.addEventListener("mouseleave", function () {
    isMouseDown = false;
})


// Full clear table
function clearTable() {
    const allcell = document.getElementsByClassName("cell-div");
    for (let i = 0; i < allcell.length; i++) {
        const cell = allcell[i];
        if (cell instanceof HTMLElement) {
            var color = '';
            cell.style.boxShadow = '0 0 0 0' + color;
            cell.style.backgroundColor = color;
        }
    }
    //console.log("cell divs are cleared")
}


// Sets the paintColor by the buttons
function changePaintColorByButton(newColor, colorNumber) {
    paintColor = newColor;
    if (paintColor == '') {
        console.log("erase has been chosen")
    } else {
        //console.log("paintColor changed to")
        hexToRgb(paintColor)
        //console.log(paintColorR, paintColorG, paintColorB)
        //console.log(paintColor)
        setChoosenColorButton()
        setDotsPlace()
        slidersThumbColor()
        chosenColorButton(colorNumber)
    }
}


// Sets the paintColor by the sliders
window.onload = function() {
    hexToRgb(paintColor)
    setChoosenColorButton()
    setDotsPlace()
    slidersThumbColor()
    setTimeout(() => {
        const colorSliderRed = document.getElementById('ColorSliderRed');
        const colorSliderGreen = document.getElementById('ColorSliderGreen');
        const colorSliderBlue = document.getElementById('ColorSliderBlue');

        //console.log(colorSliderRed, colorSliderGreen, colorSliderBlue);

        colorSliderRed?.addEventListener('input', (event) => {
            if (event.target instanceof HTMLInputElement) {
                paintColorR = parseInt(event.target.value);
                //console.log(paintColorR)
                rgbToHex(paintColorR, paintColorG, paintColorB)
                slidersThumbColor()
                chosenColorButton(10)
            }
        });
  
        colorSliderGreen?.addEventListener('input', (event) => {
            if (event.target instanceof HTMLInputElement) {
                paintColorG = parseInt(event.target.value);
                //console.log(paintColorG)
                rgbToHex(paintColorR, paintColorG, paintColorB)
                slidersThumbColor()
                chosenColorButton(10)
            }
        });
  
        colorSliderBlue?.addEventListener('input', (event) => {
            if (event.target instanceof HTMLInputElement) {
                paintColorB = parseInt(event.target.value);
                //console.log(paintColorB)
                rgbToHex(paintColorR, paintColorG, paintColorB)
                slidersThumbColor()
                chosenColorButton(10)
            }
        });
    }, 0);
}


// Change the color buttons class to make it look "chosen"
function chosenColorButton(colorNumber) {
    var Red = document.getElementById("ColorButtonRed");
    var Orange = document.getElementById("ColorButtonOrange");
    var Yellow = document.getElementById("ColorButtonYellow");
    var Green = document.getElementById("ColorButtonGreen");
    var Blue = document.getElementById("ColorButtonBlue");
    var Indigo = document.getElementById("ColorButtonIndigo");
    var Violet = document.getElementById("ColorButtonViolet");
    var White = document.getElementById("ColorButtonWhite");

    console.log('rgb(' + paintColorR + ', ' + paintColorG + ', ' + paintColorB + ', 0.5)')
    rootStyles.setProperty('--clickedcolorbutton', 'rgb(' + paintColorR + ', ' + paintColorG + ', ' + paintColorB + ', 0.3)');
    console.log(rootStyles)
    const Colors = [Red, Orange, Yellow, Green, Blue, Indigo, Violet, White]
    for (let i = 0; i < Colors.length; i++) {
        if (i == colorNumber) {
            Colors[i]?.classList.add("ColorButtonClicked");
        } else {
            Colors[i]?.classList.remove("ColorButtonClicked")
        }
    }
}


// Put the dots on the slider to the right place
function setDotsPlace() {
    console.log("setDotsPlace() called");

    const colorSliderRed = document.getElementById('ColorSliderRed');
    const colorSliderGreen = document.getElementById('ColorSliderGreen');
    const colorSliderBlue = document.getElementById('ColorSliderBlue');

    console.log(colorSliderRed, colorSliderGreen, colorSliderBlue);

    if (colorSliderRed instanceof HTMLInputElement &&
        colorSliderGreen instanceof HTMLInputElement &&
        colorSliderBlue instanceof HTMLInputElement) {
        colorSliderRed.min = '0';
        colorSliderRed.max = '255';
        colorSliderRed.value = (paintColorR).toString();

        colorSliderGreen.min = '0';
        colorSliderGreen.max = '255';
        colorSliderGreen.value = (paintColorG).toString();

        colorSliderBlue.min = '0';
        colorSliderBlue.max = '255';
        colorSliderBlue.value = (paintColorB).toString();
    }
}


// Change choosenColorButton background color
function setChoosenColorButton() {
    setTimeout(() => {
        const choosenColorButton = document.getElementById("ChoosenColor");
        if (choosenColorButton instanceof HTMLButtonElement) {
            console.log("ChoosenColor button had been set")
            choosenColorButton.style.backgroundColor = paintColor;
        }
    }, 0);
}


// Sets the color of the slidersthumb
function slidersThumbColor() {
    rootStyles.setProperty('--sliderthumbred', 'rgb(' + paintColorR + ', 0, 0)');
    rootStyles.setProperty('--sliderthumbgreen', 'rgb(0, ' + paintColorG + ', 0)');
    rootStyles.setProperty('--sliderthumbblue', 'rgb(0, 0,' + paintColorB + ')');
}


// Convert paint color to HEX form RGB, and vice versa
function rgbToHex(r, g, b) {
    paintColor = "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
    setChoosenColorButton()
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result != null) {
        paintColorR = parseInt(result[1], 16);
        paintColorG = parseInt(result[2], 16);
        paintColorB = parseInt(result[3], 16);
    }
}