export const keys = {
  ArrowLeft: false,
  ArrowRight: false,
  a: false,
  d: false,
};

export let gamepadIndex = null;

window.addEventListener("gamepadconnected", (e) => {
  gamepadIndex = e.gamepad.index;
});

window.addEventListener("gamepaddisconnected", (e) => {
  if (gamepadIndex === e.gamepad.index) {
    gamepadIndex = null;
  }
});

document.addEventListener("keydown", (e) => (keys[e.key] = true));
document.addEventListener("keyup", (e) => (keys[e.key] = false));
