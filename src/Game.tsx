import { useState } from "react";

import Card from "./components/Card";
import "./styles.css";
import whoWon from "./utils";

export default function Game() {
  const [isXTurn, setIsXTurn] = useState<boolean>(true);
  const [historyIndex, setHistoryIndex] = useState<null | number>(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [currentState, setCurrentState] = useState([]);
  const [winningIndexes, setWinner] = useState<null | [number, number, number]>(
    null
  );
  const isWatchingHistory = historyIndex !== null;

  const restClickHandler = () => {
    setCurrentState([]);
    setGameHistory([]);
    setIsXTurn(true);
    setHistoryIndex(null);
    setWinner(null);
  };
  const cardClickHandler = (event) => {
    const { id: clickedCardIndex } = event.target;
    let nextState = isWatchingHistory
      ? [...gameHistory[historyIndex]]
      : [...currentState];
    let updatedHistory = [...gameHistory, nextState];

    nextState[parseInt(clickedCardIndex, 10)] = isXTurn ? "X" : "O";

    if (isWatchingHistory) {
      setHistoryIndex(null);
      updatedHistory = [...gameHistory.slice(0, historyIndex + 1), nextState];
    }

    setIsXTurn(!isXTurn);
    setCurrentState(nextState);
    setGameHistory(updatedHistory);
    setWinner(whoWon(nextState));
  };
  const visualize = isWatchingHistory
    ? gameHistory[historyIndex]
    : currentState;
  return (
    <div className="container">
      <div className="headerContainer">
        <div>
          <h5>
            <span className="currentTurn">{isXTurn ? "X" : "O"}</span>'s Turn
          </h5>
        </div>
        <div>
          <button onClick={restClickHandler}>RESET</button>
        </div>
        <div>
          {winningIndexes && (
            <h5>Winner is {currentState[winningIndexes[0]]}</h5>
          )}
        </div>
      </div>
      <div className="board">
        {[...Array(9).keys()].map((cardIndex) => (
          <Card
            key={cardIndex}
            cardContent={visualize[cardIndex]}
            cardIndex={cardIndex}
            cardClickHandler={cardClickHandler}
            disabled={visualize[cardIndex] || winningIndexes}
            highlight={
              !isWatchingHistory &&
              winningIndexes &&
              winningIndexes.includes(cardIndex)
            }
          />
        ))}
      </div>
      <div>
        <aside>
          <h5>Game History</h5>
          <ul>
            {gameHistory.map((history, index) => (
              <li key={history.join("-")}>
                Move {index + 1}{" "}
                <button
                  onClick={() => {
                    setHistoryIndex(index);
                    setIsXTurn(index % 2 !== 0);
                  }}
                >
                  Jump
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
