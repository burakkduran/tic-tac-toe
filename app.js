const cells = document.querySelectorAll(".cell");
const resetBtn = document.querySelector(".reset-btn");
const winner = document.querySelector(".winner");

let currentMark = "x";
let needReset = false;



resetBtn.addEventListener  ( "click", async () => {
  newGameBoard = gameBoard();
  needReset = false;
  currentMark = "x";
  winner.classList.remove("show");
  render();
});

cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    let cellData = e.target.dataset.index;
    let cellText = e.target.innerText;

    if (cellText !== "" || needReset) return;
    newGameBoard.mark(cellData, currentMark);
    render()
    newGameBoard.checkWin();
  });
});

const gameBoard = () => {
  let board = ["", "", "", "", "", "", "", "", ""];

  let mark = (index, mark) => {
    board[index] = mark;
    currentMark = currentMark === "x" ? "o" : "x";
  };

  let checkWin = () => {
    winCombos.forEach((combo) => {
      if (
        board[combo[0]] !== "" &&
        board[combo[1]] !== "" &&
        board[combo[0]] === board[combo[1]] &&
        board[combo[1]] === board[combo[2]]
      ) {
        winner.classList.add("show");
        winner.innerText = `Winner is ${currentMark === "x" ? "o" : "x"} !`
        needReset = true;
      } else if (!board.includes("")) {
        winner.classList.add("show");
        winner.innerText = `Draw !`
        needReset = true;
      }
    });
  };

  return { board, mark, checkWin };
};

const render = () => {
  newGameBoard.board.forEach((mark, index) => {
    cells[index].innerText = mark;
  });
};

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let newGameBoard = gameBoard();
