import { keys, gamepadIndex } from "./input.js";

export let playerPosition = 50;
let restartPressed = false;

export function updatePlayer(deltaTime, playerEl) {
  const playerSpeed = 0.05 * deltaTime;

  if (keys.ArrowLeft || keys.a) {
    playerPosition -= playerSpeed;
  }
  if (keys.ArrowRight || keys.d) {
    playerPosition += playerSpeed;
  }

  // Gamepad
  if (gamepadIndex !== null) {
    const gp = navigator.getGamepads()[gamepadIndex];

    if (gp) {
      const stickX = gp.axes[0];

      if (stickX < -0.25) playerPosition -= playerSpeed;
      if (stickX > 0.25) playerPosition += playerSpeed;

      if (gp.buttons[14]?.pressed) playerPosition -= playerSpeed;
      if (gp.buttons[15]?.pressed) playerPosition += playerSpeed;

      // Restart
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

  playerEl.style.left = `${playerPosition}%`;
}