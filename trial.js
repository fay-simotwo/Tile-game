// const boxes = document.querySelectorAll('.box');
// let boxOne, boxTwo;

// function flipBox(e){
//     let clickedBox = e.target;
//     clickedBox.classList.add('flip');

//     boxOne = clickedBox;
//     boxTwo = clickedBox;
//     console.log(boxOne,boxTwo)
// }
// boxOne.forEach(box => {
//     box.addEventListiener('click', flipBox);
// });
const boxs = document.querySelectorAll('.box');

let hasFlippedBox = false;
let lockBoard = false;
let firstBox, secondBox;

function flipBox() {
  if (lockBoard) return;
  if (this === firstBox) return;

  this.classList.add('flip');

  if (!hasFlippedBox) {
    hasFlippedBox = true;
    firstBox = this;

    return;
  }

  secondBox = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstBox.dataset.framework === secondBox.dataset.framework;

  isMatch ? disableBoxs() : unflipBoxs();
}

function disableBoxs() {
  firstBox.removeEventListener('click', flipBox);
  secondBox.removeEventListener('click', flipBox);

  resetBoard();
}

function unflipBoxs() {
  lockBoard = true;

  setTimeout(() => {
    firstBox.classList.remove('flip');
    secondBox.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedBox, lockBoard] = [false, false];
  [firstBox, secondBox] = [null, null];
}

(function shuffle() {
  boxs.forEach(box => {
    let randomPos = Math.floor(Math.random() * 12);
    box.style.order = randomPos;
  });
})();

boxs.forEach(box => box.addEventListener('click', flipBox));