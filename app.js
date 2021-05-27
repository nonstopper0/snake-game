let container = document.querySelector('.game-container');
let boardSize = 20;
let running = false;
let outcome = "";
let runTime = 0;
let direction = 'right';
let lastDirection = 'right';
let snake;
// lower the faster
let speed;
let score;

document.addEventListener('keydown', keyPressed);

function main() {
    intializeBoard();
    setInterval(() => {
        onLoop()
    }, 1000 / 60)
}

function add() {
    foodEaten()
}

function onLoop() {
   if (running) {
        runTime += 1;
        if (runTime % speed === 0) {
            update()
        }
    } 
}

// initialize variables 
function start() {
    speed = 15;
    score = 0;
    snake = [[0, 1]],
    running = true;
    direction = 'right'
    intializeBoard();
}

function keyPressed(e) {
    e.keyCode === 37 && lastDirection != "right" && (direction = "left")
    e.keyCode === 39 && lastDirection != "left" && (direction = "right")
    e.keyCode === 38 && lastDirection != "down" && (direction = "up")
    e.keyCode === 40 && lastDirection != "up" && (direction = "down")
    console.log(direction);
}

// fill document with divs
function intializeBoard() {

    // remove previous board
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // create new board
    for (let i = 0; i <= boardSize; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);
        for (let j = 0; j <= boardSize; j++) {
            let column = document.createElement('div');
            column.classList.add('column');
            column.id = `${i} ${j}`
            row.appendChild(column)
        }
    }

    spawnFood();
}

function spawnFood() {
    let X = (Math.random() * boardSize).toFixed(0);
    let Y = (Math.random() * boardSize).toFixed(0);
    document.getElementById(`${X} ${Y}`).classList.add('food');
}

function foodEaten() {
    score += 1;
    document.getElementById('score').innerText = 'Score: ' + score
    let lSnake = snake[snake.length - 1];
    snake.push(lSnake);
    speed > 5 && (speed -= 1);
    spawnFood();
}

function getNewHeadPos() {
    return new Promise((resolve, reject) => {
        // for some reason if i call just snake[0] here, It acts as if i am directly mutating snake. 
        // This is basically just doing the exact same variable grab as newHead = snake[0] but instead im writing it in a different way, and somehow it behaves differently. Weirdest JS bug I have ever encountered.
        let newHead = [snake[0][0], snake[0][1]];
        if (direction === "up") {
            newHead[0] = newHead[0] - 1 > -1 ? newHead[0] - 1 : lose()
        } else if (direction === "down") {
            newHead[0] = newHead[0] + 1 <= boardSize ? newHead[0] + 1 : lose()
        } else if (direction === "right") {
            newHead[1] = newHead[1] + 1 <= boardSize ? newHead[1] + 1 : lose()
        } else if (direction === "left") {
            newHead[1] = newHead[1] - 1 > -1 ? newHead[1] - 1 : lose()
        }   

        console.log(newHead)
    
        resolve(newHead)
    })
}

async function update(user) {
    lastDirection = direction;
    
    // remove last snake
    document.getElementById(`${snake[snake.length - 1][0]} ${snake[snake.length - 1][1]}`).classList.remove('snake');

    let head = await getNewHeadPos();
    snake.unshift(head);
    snake.pop();
    
    
    
    // draw new head
    let fill = document.getElementById(`${snake[0][0]} ${snake[0][1]}`)
    if (fill.classList.contains('food')) {
        foodEaten()
        fill.classList.remove('food');
    }
    fill.classList.add('snake');
    // for (let i = 0; i < snake.length; i++) {
    // }
}

function lose() {
    running = false;
    alert('you lost');
}



main();