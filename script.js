const boxes = document.querySelectorAll('.boxes li');
let hasFlippedBox = false;
let lockBoard = false;
let firstBox, secondBox;
let moveCounter = 0;
const moveCounterElement = document.getElementById('move-counter');
const starRatingElement = document.getElementById('star-rating');
const timerElement = document.getElementById('timer');

let timerInterval;
let seconds = 0;
let minutes = 0;

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
    incrementMoveCounter();
    updateStarRating(); // Update the star rating after each move
  }
}

function checkForMatch() {
    let isMatch = firstBox.querySelector('.back img').src === secondBox.querySelector('.back img').src;
  
    if (isMatch) {
      disableBoxes();
      animateMatch();
      checkWinCondition();
    } else {
      unflipBoxes();
      animateMismatch();
    }
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
function animateMatch() {
    firstBox.querySelector('.front').classList.add('pulse');
    firstBox.querySelector('.back').classList.add('pulse');
    secondBox.querySelector('.front').classList.add('pulse');
    secondBox.querySelector('.back').classList.add('pulse');
  }
function animateMismatch() {
    firstBox.classList.add('shake');
    secondBox.classList.add('shake');
  
    setTimeout(() => {
      firstBox.classList.remove('shake');
      secondBox.classList.remove('shake');
    }, 500);
  }


function resetBoard() {
  [hasFlippedBox, lockBoard] = [false, false];
  [firstBox, secondBox] = [null, null];
}
function incrementMoveCounter() {
    moveCounter++; // Increment the move counter
    moveCounterElement.textContent = moveCounter; // Update the move counter element in the HTML
  }
  function updateStarRating() {
    let starRating = getStarRating(); // Get the star rating based on the number of moves
    starRatingElement.innerHTML = starRating; // Update the star rating element in the HTML
  }
  
  function getStarRating() {
    if (moveCounter <= 10) {
      return '⭐⭐⭐'; // 3 stars for 10 moves or fewer
    } else if (moveCounter <= 15) {
      return '⭐⭐'; // 2 stars for 11-15 moves
    } else {
      return '⭐'; // 1 star for more than 15 moves
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
      seconds++;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
      }
      timerElement.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
    }, 1000);
  }
  
  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }
  
  function stopTimer() {
    clearInterval(timerInterval);
  }
  
  function checkWinCondition() {
    const matchedBoxes = document.querySelectorAll('.flip');
    if (matchedBoxes.length === boxes.length) {
      stopTimer(); // Stop the timer when all boxes are matched
    
    }
  }
  
  

  (function shuffle() {
    boxes.forEach(box => {
      let randomPos = Math.floor(Math.random() * 12);
      box.style.order = randomPos;
    });
  
    startTimer(); // Start the timer when shuffling is complete
  })();
  const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', restartGame);

function restartGame() {
    // Reset game board
    boxes.forEach(box => {
      box.classList.remove('flip');
      box.addEventListener('click', flipBox);
    });
  
    resetBoard();
  
    // Reset move counter
    moveCounter = 0;
    moveCounterElement.textContent = moveCounter;
      // Reset star rating
  updateStarRating();

  // Reset timer
  stopTimer();
  seconds = 0;
  minutes = 0;
  timerElement.textContent = '00:00';

  // Start timer
  startTimer();
}
boxes.forEach(box => box.addEventListener('click', flipBox));
