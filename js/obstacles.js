import { checkCollision } from './collision.js';

export let obstacles = [];

export function spawnObstacle(gameField) {
  const el = document.createElement("div");
  el.classList.add("obstacle");

  const x = Math.random() * 90;
  el.style.left = `${x}%`;
  el.style.top = `0%`;

  gameField.appendChild(el);

  obstacles.push({
    el,
    position: 0,
  });
}

export function updateObstacles(deltaTime, playerEl, onCollision) {
  const obstacleSpeed = 0.09 * deltaTime;

  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obs = obstacles[i];
    obs.position += obstacleSpeed;
    obs.el.style.top = `${obs.position}%`;

    if (checkCollision(playerEl, obs.el)) {
      onCollision();
      return;
    }

    if (obs.position > 110) {
      obs.el.remove();
      obstacles.splice(i, 1);
    }
  }
}
