export function scoreRecord(currentScore) {
  const bestScore = Number(localStorage.getItem("bestScore")) || 0;

  if (currentScore > bestScore) {
    localStorage.setItem("bestScore", currentScore);
    return currentScore;
  }
  return bestScore;
}
