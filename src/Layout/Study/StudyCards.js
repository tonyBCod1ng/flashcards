import React from "react";
import { useHistory } from "react-router-dom";

export default function StudyCards({
  deck,
  index,
  viewingFront,
  setIndex,
  setViewingFront,
}) {
  const history = useHistory();

  const flipClickHandler = () => {
    setViewingFront(() => !viewingFront);
  };

  const nextClickHandler = () => {
    if (index + 1 === deck.cards.length) {
      const answer = window.confirm(
        "Restart cards?\n\nClick cancel to return to the home page."
      );
      answer ? setIndex(() => 0) : history.push("/");
    } else {
      setIndex(() => index + 1);
    }
    setViewingFront(() => true);
  };

  return (
    <div className="card ">
      <div className="card-body">
        <h4 className="card-title">
          Card {index + 1} of {deck.cards.length}
        </h4>
        <p className="card-text">
          {Object.keys(deck).length !== 0
            ? viewingFront
              ? deck.cards[index].front
              : deck.cards[index].back
            : null}
        </p>
        <button className="btn btn-secondary mr-1" onClick={flipClickHandler}>
          Flip
        </button>

        {!viewingFront ? (
          <button className="btn btn-primary" onClick={nextClickHandler}>
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
}