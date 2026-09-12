// global variables
const player = document.querySelector(".player");
const gameField = document.querySelector(".game-field");
const banner = document.querySelector('.loose');
let playerPosition = 50;
let gamepadIndex = null;
let restartPressed = false;
let score = 0;

// gamepad events
window.addEventListener("gamepadconnected", (e) => {
  gamepadIndex = e.gamepad.index;
});

window.addEventListener("gamepaddisconnected", (e) => {
  if (gamepadIndex === e.gamepad.index) {
    gamepadIndex = null;
  }
});

// game over function
const gameOver = () => {
  clearInterval(spawnInterval);
  clearInterval(scoreInterval);

  document.removeEventListener("keydown", handleKeyDown);

  banner.style.display = 'flex';
  gameField.style.display = 'none';

  const scoreNumber = document.createElement('p');
  scoreNumber.textContent = `Your score is: ${score}`;
  banner.appendChild(scoreNumber);

  const bestScoreNumber = document.createElement('p');
  bestScoreNumber.textContent = `Your score is: ${scoreRecord(score)}`;
  banner.appendChild(bestScoreNumber);
};

const handleKeyDown = (e) => {
  movePlayer(e.key);
};

// move player function
const gameLoop = () => {
  // keyboard
  if (keys.ArrowLeft || keys.a) {
    playerPosition -= 0.5;
  }

  if (keys.ArrowRight || keys.d) {
    playerPosition += 0.5;
  }

  // gamepad
  if (gamepadIndex !== null) {
    const gp = navigator.getGamepads()[gamepadIndex];
    
    if (gp) {
      const stickX = gp.axes[0];

      if (stickX < -0.25) {
        playerPosition -= 0.5;
      } else if (stickX > 0.25) {
        playerPosition += 0.5;
      }

      // D-pad
      if (gp.buttons[14]?.pressed) {
        playerPosition -= 0.5;
      }

      if (gp.buttons[15]?.pressed) {
        playerPosition += 0.5;
      }

      if (gp.buttons[0]?.pressed) {
        if (!restartPressed) {
          restartPressed = true;
          location.reload();
        }
      } else {
        restartPressed = false;
      }
    }
  }

  if (playerPosition < 0 || playerPosition > 100) {
    gameOver();
  }

  player.style.left = `${playerPosition}%`;

  requestAnimationFrame(gameLoop);
};

// check collision function
const checkCollision = (obstacle) => {
  const playerRect = player.getBoundingClientRect();
  const enemyRect = obstacle.getBoundingClientRect();

  const collision =
    playerRect.left < enemyRect.right &&
    playerRect.right > enemyRect.left &&
    playerRect.top < enemyRect.bottom &&
    playerRect.bottom > enemyRect.top;

  if (collision) {
    gameOver();
  }
};

// move obstacles function
const moveObstacle = (obstacle) => {
  let position = 0;

  const interval = setInterval(() => {
    position += 5;
    obstacle.style.top = `${position}px`;
    checkCollision(obstacle);

    if (position > gameField.clientHeight) {
      clearInterval(interval);
      obstacle.remove();
    }
  }, 10);
};

// spawn obstacle function
const spawnObstacle = () => {
  const obstacle = document.createElement("div");
  const maxXPosition = gameField.clientWidth - 20;
  const randomXPosition = Math.random() * maxXPosition;

  obstacle.classList.add("obstacle");
  obstacle.style.left = `${randomXPosition}px`;
  obstacle.style.top = `0px`;
  gameField.appendChild(obstacle);
  moveObstacle(obstacle);
};

// spawning obstacle every 70 ms
const spawnInterval = setInterval(spawnObstacle, 70);

const keys = {
  ArrowLeft: false,
  ArrowRight: false
};

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// start counting score
const scoreInterval = setInterval(() => {
  score++;
}, 1000);

// best score checking function
const scoreRecord = (score) => {
  const bestScore = Number(localStorage.getItem('bestScore')) || 0;

  if (score > bestScore) {
    localStorage.setItem('bestScore', score);
    return score;
  }

  return bestScore;
};

gameLoop();