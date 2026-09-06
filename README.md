# Dodge Game 🎮

A fast-paced browser-based dodge game built with vanilla JavaScript, HTML5, and CSS3. Move your player left and right to avoid falling obstacles for as long as possible.

## 🕹️ Live Demo

[Play the game](https://moodddii.github.io/Doudge-game/)

## 🎯 How to Play

- Use **← →** arrow keys to move the player
- Avoid falling obstacles
- One hit — game over
- Press **F5** to restart

## ⚙️ How It Works

- Obstacles spawn every 100ms at a random horizontal position and fall down the screen
- Player movement is handled via `requestAnimationFrame` for smooth 60fps motion
- Collision detection uses `getBoundingClientRect()` to compare player and obstacle positions in real time
- On collision — intervals are cleared, event listeners removed, and the game over screen is shown

## 🛠️ Tech Stack

- Vanilla JavaScript (ES6+)
- HTML5
- CSS3

## 🚀 Run Locally

```bash
git clone https://github.com/MOODDDII/Doudge-game
cd Doudge-game
# Open index.html in your browser
```

## 📁 Project Structure

```
Doudge-game/
├── index.html
├── game.js
└── main.css
```
