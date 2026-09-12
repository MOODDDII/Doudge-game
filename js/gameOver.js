import { scoreRecord } from './score.js';

export function gameOver(banner, gameField, score) {
  banner.style.display = "flex";
  gameField.style.display = "none";

  const scoreNumber = document.createElement("p");
  scoreNumber.textContent = `Your score is: ${score}`;
  banner.appendChild(scoreNumber);

  const bestScoreNumber = document.createElement("p");
  bestScoreNumber.textContent = `Your best score is: ${scoreRecord(score)}`;
  banner.appendChild(bestScoreNumber);
}