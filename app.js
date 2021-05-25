let container = document.querySelector('.game-container');


// fill document with divs
function intialize() {
    for (let i = 0; i < 32; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);
        for (let j = 0; j < 32; j++) {
            let column = document.createElement('div');
            column.classList.add('column');
            column.id = `${i} ${j}`
            row.appendChild(column)
        }
    }
}


function main() {
    intialize()
}

function loop() {

}

main();