let container = document.querySelector('.game-container');

function intialize() {
    for (let i = 0; i < 32; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);
        for (let i = 0; i < 32; i++) {
            let column = document.createElement('div');
            column.classList.add('column');
            column.style.width = '10px';
            column.style.height = '10px';
            column.style.backgroundColor = "black"
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