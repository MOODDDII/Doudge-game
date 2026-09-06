// global variables
const player = document.querySelector(".player");
const gameField = document.querySelector(".game-field");
const banner = document.querySelector('.loose');
let playerPosition = 50;

// game over function
const gameOver = () => {
  clearInterval(spawnInterval);
  document.removeEventListener("keydown", handleKeyDown);
  banner.style.display = 'flex';
  gameField.style.display = 'none';
};

const handleKeyDown = (e) => {
  movePlayer(e.key);
};

// move player function
const gameLoop = () => {
  if (keys.ArrowLeft) {
    playerPosition -= 0.5;
  }

  if (keys.ArrowRight) {
    playerPosition += 0.5;
  }

  if (playerPosition < 0 || playerPosition > 100) {
    gameOver();
  }

  player.style.left = `${playerPosition}%`;

  requestAnimationFrame(gameLoop);
};

//check collision function
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

// spawning obstacle every second
const spawnInterval = setInterval(spawnObstacle, 100);

const keys = {
  ArrowLeft: false,
  ArrowRight: false
};

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

gameLoop();