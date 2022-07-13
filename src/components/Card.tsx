export default function Card({
  cardIndex,
  cardClickHandler,
  highlight,
  cardContent,
  disabled
}) {
  return (
    <div className="card">
      <button
        id={`${cardIndex}`}
        onClick={cardClickHandler}
        className={highlight ? "highlightedCardButton" : "cardButton"}
        disabled={disabled}
      >
        {cardContent}
      </button>
    </div>
  );
}
