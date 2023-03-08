var rows = 16; // Sets the size of the matrix
var columns = 16;

var isMouseDown = false; // Tracks if the mouse pressed (need to draw)

let  paintColor = '#ffff00'; // The color that picked to paint
let paintColorR = 255;
let paintColorG = 255;
let paintColorB = 0;

//const colorSliderRed = document.getElementById('ColorSliderRed');
//const colorSliderGreen = document.getElementById('ColorSliderGreen');
//const colorSliderBlue = document.getElementById('ColorSliderBlue');



// Create the table
for (var i = 10; i < rows + 10; i++) {
    document.write("<tr>");
    for (var j = 10; j < columns + 10; j++) {
        document.write(`<td id="c${i}${j}"></td>`);
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
        this.style.backgroundColor = paintColor;
        console.log('Painted');
    });
    cells[i].addEventListener("mouseover", function() {
        if (isMouseDown) {
            this.style.backgroundColor = paintColor;
            console.log("Cells are painted");
        }
    });
}

// Sets isMouseDown to false when mouse released
var table = document.getElementsByTagName("table")[0];
table.addEventListener("mouseup", function() {
    isMouseDown = false;
});


// Sets the paintColor by the buttons
function changePaintColorByButton(newColor) {
    paintColor = newColor;
    console.log("paintColor changed to")
    console.log(paintColor)

    setChoosenColorButton()
    rgbToHex()
    setSliderDotsPlace()
}


// Sets the paintColor by the sliders
window.onload = function() {
    setTimeout(() => {
        const colorSliderRed = document.getElementById('ColorSliderRed');
        const colorSliderGreen = document.getElementById('ColorSliderGreen');
        const colorSliderBlue = document.getElementById('ColorSliderBlue');
  
        console.log(colorSliderRed, colorSliderGreen, colorSliderBlue);

        colorSliderRed?.addEventListener('input', (event) => {
            if (event.target instanceof HTMLInputElement) {
                paintColorR = parseInt(event.target.value);
                console.log(paintColorR)
                rgbToHex(paintColorR, paintColorG, paintColorB)
            }
        });
  
        colorSliderGreen?.addEventListener('input', (event) => {
            if (event.target instanceof HTMLInputElement) {
                paintColorG = parseInt(event.target.value);
                console.log(paintColorG)
                rgbToHex(paintColorR, paintColorG, paintColorB)
            }
        });
  
        colorSliderBlue?.addEventListener('input', (event) => {
            if (event.target instanceof HTMLInputElement) {
                paintColorB = parseInt(event.target.value);
                console.log(paintColorB)
                rgbToHex(paintColorR, paintColorG, paintColorB)
            }

        });

    }, 0);

}


// Put the dots on the slider to the right place
function setSliderDotsPlace() {
    console.log("setSliderDotsPlace() called")
    document.getElementById('ColorSliderRed').value = paintColorR;
    document.getElementById('ColorSliderGreen').value = paintColorG;
    document.getElementById('ColorSliderBlue').value = paintColorB;
}


// Change choosenColorButton background color
function setChoosenColorButton() {
    document.getElementById("ChoosenColor").style.backgroundColor = paintColor;
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
    //setDotsPlace()
}