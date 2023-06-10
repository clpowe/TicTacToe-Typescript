import './style.css';

// selectors

const gameBoard: HTMLElement | null = document.querySelector('#board');
const info: HTMLElement | null = document.querySelector('#info');
let turn: string;

type WinningCombo = number[];

const winningCombos: WinningCombo[] = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left col
  [1, 4, 7], // middle col
  [2, 5, 8], // right col
  [0, 4, 8], // diagonal left to right
  [2, 4, 6], // diagonal right to left
];

// create the gameboard
function createGameboard() {
  const emptyTiles: string[] = ' '.repeat(9).split('');
  const tileGrid: string = emptyTiles
    .map((t: string) => `<button class="tile">${t}</button>`)
    .join('');
  if (!gameBoard) {
    return;
  }
  gameBoard.innerHTML = tileGrid;
  turn = 'X';
  if (!info) {
    return;
  }
  info.textContent = `${turn}'s turn`;
  gameBoard.addEventListener('click', handleGameboardClick);
  const allTiles: NodeList = gameBoard.querySelectorAll('.tile');
  allTiles.forEach((tile) => {
    tile.addEventListener('mouseenter', handleMouseEnter);
    tile.addEventListener('mouseleave', handleMouseLeave);
  });
  gameBoard?.removeAttribute('inert');
}

createGameboard();

function updateTurn() {
  turn = turn === 'X' ? 'O' : 'X';
  if (!info) {
    return;
  }
  info.textContent = `${turn}'s turn`;
}

function restartGame() {
  let seconds = 3;
  const timer = setInterval(() => {
    if (!info) {
      return;
    }
    info.textContent = `Restarting in ${seconds}`;
    seconds--;
    if (seconds < 0) {
      clearInterval(timer);
      createGameboard();
    }
  }, 1000);
}

function showCongrats() {
  if (!info) {
    return;
  }
  info.textContent = `${turn} wins!`;

  gameBoard?.removeEventListener('click', handleGameboardClick);
  gameBoard?.setAttribute('inert', 'true');
  setTimeout(restartGame, 1000);
}

function checkScore() {
  const allTiles: Element[] = [...document.querySelectorAll('.tile')];
  const tileValues = allTiles.map((t) => (t as HTMLElement).dataset.value);
  const isWinner: boolean = winningCombos.some((combo) => {
    const [a, b, c] = combo;
    return (
      tileValues[a] &&
      tileValues[a] === tileValues[b] &&
      tileValues[a] === tileValues[c]
    );
  });
  if (isWinner) {
    return showCongrats();
  }
  updateTurn();
}

function handleGameboardClick(event: MouseEvent): void {
  const valueExists: string | undefined = (event.target as HTMLElement)?.dataset
    .value;

  if (!valueExists) {
    (event.target as HTMLElement).dataset.value = turn;
    (event.target as HTMLElement).style.setProperty(
      '--hue',
      turn === 'X' ? '10' : '200'
    );
    checkScore();
  }
}

function handleMouseEnter(event: MouseEvent): void {
  const valueExists: string | undefined = (event.target as HTMLElement)?.dataset
    .value;
  if (!valueExists) {
    (event.target as HTMLElement).dataset.hover = turn;
    (event.target as HTMLElement).style.setProperty(
      '--hue',
      turn === 'X' ? '10' : '200'
    );
  }
}

function handleMouseLeave(event: MouseEvent): void {
  (event.target as HTMLElement).dataset.hover = '';
}
