let gridBox = document.querySelector('.gridBox');
let resultDisplay = document.querySelector('.resultDisplay')
let scoreDisplay = document.querySelector('.scoreBoard span')
let width = 4;
let squares = [];
let score = 0


gridBox.style.gridTemplateColumns = `repeat(${width}, 80px)`
gridBox.style.gridTemplateRows = `repeat(${width}, 80px)`

function createBoard() {
    for(let i = 0; i < width * width; i++) {
        let square = document.createElement('div')
        square.innerText = 0;
        square.setAttribute('data-id', 0)
        gridBox.appendChild(square)
        squares.push(square)
    }
    generate();
    generate();
}

createBoard()

function generate() {
    let randomNumber = Math.floor(Math.random() * squares.length);
    if(squares[randomNumber].innerHTML == 0) {
        squares[randomNumber].innerHTML = 2;
        squares[randomNumber].setAttribute('data-id', 2)
        checkForGameOver()
    } else generate()
}


function moveRight () {
    for(let i = 0; i < width * width; i++) {
        if(i % width == 0) {
            let rows = []

            for(let j = 0; j < width; j++) {
                rows.push(+(squares[i+j].innerHTML))
            }
            
            let filteredRows = rows.filter(row => row)
            let missing = width - filteredRows.length
            let zeros = Array(missing).fill(0)
            let newRow = zeros.concat(filteredRows);


            for(let j = 0; j < width; j++) {
                squares[i+j].innerHTML = newRow[j]
                squares[i+j].setAttribute('data-id', newRow[j])
            }
            
        }

    }
}

function moveLeft () {
    for(let i = 0; i < width * width; i++) {
        if(i % width == 0) {
            let rows = []
            
            for(let j = 0; j < width; j++) {
                rows.push(+(squares[i+j].innerHTML))
            }
            
            let filteredRows = rows.filter(row => row)
            let missing = width - filteredRows.length
            let zeros = Array(missing).fill(0)
            let newRow = filteredRows.concat(zeros);


            for(let j = 0; j < width; j++) {
                squares[i+j].innerHTML = newRow[j]
                squares[i+j].setAttribute('data-id', newRow[j])
            }
            
        }

    }
}



function combinedRow() {
    for(let i = 0; i < (width * width)-1; i++) {
        if(squares[i].innerHTML == squares[i+1].innerHTML) {
            let combinedTotal = +(squares[i].innerHTML) + +(squares[i+1].innerHTML);
            squares[i].innerHTML = combinedTotal;
            squares[i+1].innerHTML = 0;
            score += combinedTotal;
            scoreDisplay.innerHTML = score;
        }
    }
}



function moveDown() {
    let num = 1;
    for(let i=0; i < width; i++) {
        let columns = []
        for(let j = 0; j < width; j++) {
            columns.push(+(squares[i+(j*width)].innerHTML))
        }
        
        let filteredColumn = columns.filter(num => num)
        let missing = width - filteredColumn.length;
        let zeros = Array(missing).fill(0)
        let newColumns = zeros.concat(filteredColumn);
        
        for(let j = 0; j < width; j++) {
            squares[i+(width*j)].innerHTML = newColumns[j]
            squares[i+(width*j)].setAttribute('data-id', newColumns[j])
        }

    }
}

function moveUp() {
    let num = 1;
    for(let i=0; i < width; i++) {
        let columns = []
        for(let j = 0; j < width; j++) {
            columns.push(+(squares[i+(j*width)].innerHTML))
        }
        
        let filteredColumn = columns.filter(num => num)
        let missing = width - filteredColumn.length;
        let zeros = Array(missing).fill(0)
        let newColumns = filteredColumn.concat(zeros);
        
        for(let j = 0; j < width; j++) {
            squares[i+(width*j)].innerHTML = newColumns[j]
            squares[i+(width*j)].setAttribute('data-id', newColumns[j])
        }

    }
}



function combinedColumn() {
    console.log(width* width - width)
    for(let i = 0; i < (width * width)-width; i++) {
        if(squares[i].innerHTML == squares[i+width].innerHTML) {
            let combinedTotal = +(squares[i].innerHTML) + +(squares[i+width].innerHTML);
            squares[i].innerHTML = combinedTotal;
            // squares[i].setAttribute('data-id', combinedTotal);
            squares[i+width].innerHTML = 0;
            // squares[i+width].setAttribute('data-id', 0);
            score += combinedTotal;
            scoreDisplay.innerHTML = score;
        }
    }
}





let controls = e => {
    if(e.keyCode == 39) {
        keyRight()
    }
    else if(e.keyCode == 37) {
        keyLeft()
    }
    else if(e.keyCode == 38) {
        keyUp()
    }
    else if(e.keyCode == 40) {
        keyDown()
    }
}


document.addEventListener('keyup', controls)



function keyRight() {
    moveRight();
    combinedRow();
    moveRight();
    generate()
}

function keyLeft() {
    moveLeft();
    combinedRow();
    moveLeft();
    generate()
}

function keyDown() {
    moveDown();
    combinedColumn();
    moveDown();
    generate()
}

function keyUp() {
    moveUp();
    combinedColumn();
    moveUp();
    generate()
}

function checkForWin () {
    for(let i = 0; i < squares.length; i++) {
        if(squares[i].innerHTML == 2048) {
            resultDisplay.innerHTML = 'You Win U+1F600'
            resultDisplay.style.display = 'block'
            document.removeEventListener('keyup', controls)
        }
    }
}

function checkForGameOver () {
    let zeros = 0;
    for(let i= 0; i < squares.length; i++) {
        if(squares[i].innerHTML == 0) {
            zeros++
        }
    }
    if(zeros === 0) {
        resultDisplay.innerHTML = 'You Lose'
        resultDisplay.style.display = 'block'
        document.removeEventListener('keyup', controls)
    }
}