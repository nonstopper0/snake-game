let container = document.querySelector('.game-container');
let boardSize = 20;
let running = false;
let outcome = "";
let runTime = 0;
let direction = 'right'
let directionChanged = false;
let snake = [[2, 1], [0, 0]]
// lower the faster
let speed = 30;
let score = 0;

document.addEventListener('keydown', keyPressed);

function main() {
    intialize()
    setInterval(() => {
        onLoop()
    },  1000 / 60)
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

// called from start button
function start() {
    running = true;
}

function keyPressed(e) {
    e.keyCode === 37 && direction != "right" && (direction = "left")
    e.keyCode === 39 && direction != "left" && (direction = "right")
    e.keyCode === 38 && direction != "down" && (direction = "up")
    e.keyCode === 40 && direction != "up" && (direction = "down")
    console.log(direction);
}

// fill document with divs
function intialize() {
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
    let food = document.getElementById(`${X} ${Y}`);
    food.classList.add('food');
}

function foodEaten() {
    score += 1;
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

        snake.forEach((snek) => {
            console.log(snek, newHead)
            if (snek === newHead) {
                lose()
            }
        })
    
        resolve(newHead)
    })
}

async function update(user) {
    
    // remove old snake array
    for (let i = 0; i < snake.length; i++) {
        let remove = document.getElementById(`${snake[i][0]} ${snake[i][1]}`)
        remove.classList.remove('snake');
    }
    let head = await getNewHeadPos();
    snake.unshift(head);
    snake.pop();
    
    
    
    //draw new snake array
    for (let i = 0; i < snake.length; i++) {
        let fill = document.getElementById(`${snake[i][0]} ${snake[i][1]}`)
        if (fill.classList.contains('food')) {
            foodEaten()
            fill.classList.remove('food');
        }
        if (fill.classList.contains('snake')) {
            console.log(fill);
        }
        fill.classList.add('snake');
    }
}

function lose() {
    running = false;
    console.log('you lost');
}



main();
start();