// Create the table
for (var i = 10; i < rows + 10; i++) {
    document.write("<tr>");
    for (var j = 10; j < columns + 10; j++) {
        document.write(`<td id="c${i}${j}" class="blankCell"><div class="cellBlankDiv cell-div"></div></td>`);
    }
}