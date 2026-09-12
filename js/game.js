import { updatePlayer, playerPosition } from './player.js';
import { spawnObstacle, updateObstacles, obstacles } from './obstacles.js';
import { gameOver } from './gameOver.js';

const player = document.querySelector(".player");
const gameField = document.querySelector(".game-field");
const banner = document.querySelector(".loose");

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
  if (spawnTimer > 300) {
    spawnObstacle(gameField);
    spawnTimer = 0;
  }

  // Score
  scoreTimer += deltaTime;
  if (scoreTimer > 1000) {
    score++;
    scoreTimer = 0;
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);