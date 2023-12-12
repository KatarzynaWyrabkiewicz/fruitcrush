const grid = document.querySelector(".grid");
const points = document.querySelector(".points");
const squares = [];

function getFruits() {
    const fruitsOptions = ["🍒", "🍌", "🍇", "🍏"];
    return fruitsOptions[Math.floor(Math.random() * fruitsOptions.length)];
}

for (let i = 0; i < 9; i++) {
    const square = document.createElement("div");
    square.setAttribute("draggable", true);
    square.setAttribute("id", i);
    square.textContent = getFruits();
    grid.appendChild(square);
    squares.push(square);
}

let fruitsDragged, fruitsReplaced, idDragged, idReplaced;

squares.forEach((square) => {
    square.addEventListener("dragstart", dragStart);
    square.addEventListener("drop", dragDrop);
    square.addEventListener("dragover", (e) => e.preventDefault());
});

function dragStart() {
    fruitsDragged = this.textContent;
    idDragged = parseInt(this.id);
}

function checkForMatches(line) {
    if (
        squares[line[0]].textContent == squares[line[1]].textContent &&
        squares[line[0]].textContent == squares[line[2]].textContent
    ) {
        points.textContent = parseInt(points.textContent) + 1;
        line.forEach((index) => {
            squares[index].textContent = getFruits();
        });
    }
}

function dragDrop() {
    fruitsReplaced = this.textContent;
    idReplaced = parseInt(this.id);
    this.textContent = fruitsDragged;
    squares[idDragged].textContent = fruitsReplaced;

    // Check for vertical matches
    for (let i = 0; i <= 2; i++) {
        const verticalLine = [i, i + 3, i + 6];
        checkForMatches(verticalLine);
    }

    // Check for horizontal matches
    for (let i = 0; i <= 6; i += 3) {
        const horizontalLine = [i, i + 1, i + 2];
        checkForMatches(horizontalLine);
    }
}
