import './style.css';

// selectors

const gameBoard: HTMLElement | null = document.querySelector('#board');
const info: HTMLElement | null = document.querySelector('#info');
let turn: string;

// create the gameboard
function createGameboard() {
  const emptyTiles: string[] = ' '.repeat(9).split('');
  const tileGrid: string = emptyTiles
    .map((t: string) => `<button class="tile">${t}</button>`)
    .join('');
  console.log(tileGrid);
  if (!gameBoard) {
    return;
  }
  gameBoard.innerHTML = tileGrid;
  turn = 'X';
  if (!info) {
    return;
  }
  info.textContent = `${turn}'s turn`;
}

createGameboard();
