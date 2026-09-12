export function checkCollision(playerEl, obstacleEl) {
  const playerRect = playerEl.getBoundingClientRect();
  const enemyRect = obstacleEl.getBoundingClientRect();

  return (
    playerRect.left < enemyRect.right &&
    playerRect.right > enemyRect.left &&
    playerRect.top < enemyRect.bottom &&
    playerRect.bottom > enemyRect.top
  );
}