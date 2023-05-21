const boxes = document.querySelectorAll('.boxes li');
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
  } else {
    secondBox = this;
    checkForMatch();
  }
}

function checkForMatch() {
  let isMatch = firstBox.querySelector('.back img').src === secondBox.querySelector('.back img').src;

  isMatch ? disableBoxes() : unflipBoxes();
}

function disableBoxes() {
  firstBox.removeEventListener('click', flipBox);
  secondBox.removeEventListener('click', flipBox);

  resetBoard();
}

function unflipBoxes() {
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
  boxes.forEach(box => {
    let randomPos = Math.floor(Math.random() * 12);
    box.style.order = randomPos;
  });
})();

boxes.forEach(box => box.addEventListener('click', flipBox));