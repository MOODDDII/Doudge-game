import { updatePlayer, playerPosition } from './player.js';
import { spawnObstacle, updateObstacles, obstacles } from './obstacles.js';
import { gameOver } from './gameOver.js';
import { gamepadIndex } from './input.js';

const player = document.querySelector(".player");
const gameField = document.querySelector(".game-field");
const banner = document.querySelector(".loose");
const scoreValue = document.querySelector(".score-value");

let score = 0;
let isGameOver = false;
let lastTime = 0;
let spawnTimer = 0;
let scoreTimer = 0;

function handleGameOver() {
  if (isGameOver) return;
  isGameOver = true;
  gameOver(banner, gameField, score);
}

function gameLoop(timestamp) {
  if (isGameOver) return;

  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  // Player
  updatePlayer(deltaTime, player);

  if (playerPosition < 0 || playerPosition > 100) {
    handleGameOver();
  }

  // Obstacles
  updateObstacles(deltaTime, player, handleGameOver);

  // Spawn
  spawnTimer += deltaTime;
  if (spawnTimer > 150) {
    spawnObstacle(gameField);
    spawnTimer = 0;
  }

  // Score
  scoreTimer += deltaTime;
  if (scoreTimer > 1000) {
    score++;
    scoreTimer = 0;
    scoreValue.textContent = score;
  }

  requestAnimationFrame(gameLoop);
}

function restartLoop() {
  if (gamepadIndex !== null) {
    const gp = navigator.getGamepads()[gamepadIndex];

    if (gp && gp.buttons[0]?.pressed) {
      location.reload();
    }
  }

  requestAnimationFrame(restartLoop);
}

restartLoop();

requestAnimationFrame(gameLoop);