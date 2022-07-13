export const whoWon = (nextState) => {
  let winner = null;
  const checkPositionalValues = (position1, position2, position3) => {
    if (!nextState[position1]) {
      return false;
    }
    if (
      nextState[position1] === nextState[position2] &&
      nextState[position2] === nextState[position3]
    ) {
      return true;
    }
    return false;
  };
  for (let cardIndex = 0; cardIndex < nextState.length; cardIndex++) {
    let currentPosition = cardIndex;
    let p2;
    let p3;

    if (cardIndex % 3 === 0 && nextState[cardIndex]) {
      p2 = cardIndex + 1;
      p3 = cardIndex + 2;
      if (checkPositionalValues(currentPosition, p2, p3)) {
        winner = [currentPosition, p2, p3];
        break;
      }
    }
    if (cardIndex < 3 && nextState[cardIndex]) {
      p2 = cardIndex + 3;
      p3 = cardIndex + 6;
      if (checkPositionalValues(currentPosition, p2, p3)) {
        winner = [currentPosition, p2, p3];
        break;
      }
    }
    if (cardIndex === 0) {
      p2 = 4;
      p3 = 8;
      if (checkPositionalValues(currentPosition, p2, p3)) {
        winner = [currentPosition, p2, p3];
        break;
      }
    }
    if (cardIndex === 2) {
      p2 = 4;
      p3 = 6;
      if (checkPositionalValues(currentPosition, p2, p3)) {
        winner = [currentPosition, p2, p3];
        break;
      }
    }
  }
  return winner;
};

export default whoWon;
