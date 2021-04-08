import React, { useState, Fragment } from "react";
import { useRouteMatch } from "react-router-dom";
import ErrorMessage from "../Common/ErrorMessage";
import StudyNav from "./StudyNav";
import StudyCards from "./StudyCards";
import NotEnoughCards from "./NotEnoughCards";

export default function Study({ deckId, deck, error, setError }) {
  const [viewingFront, setViewingFront] = useState(true);
  const [index, setIndex] = useState(0);
  const { url } = useRouteMatch();

  if (error) {
    return <ErrorMessage setError={setError} />;
  }

  console.log(deck);
  return (
    <Fragment>
      <StudyNav deck={deck} deckId={deckId} />
      <h2>Study: {deck.name}</h2>
      {Object.keys(deck).length ? (
        deck.cards.length > 2 ? (
          <StudyCards
            deck={deck}
            viewingFront={viewingFront}
            setViewingFront={setViewingFront}
            index={index}
            setIndex={setIndex}
          />
        ) : (
          <NotEnoughCards deck={deck} url={url} />
        )
      ) : null}
    </Fragment>
  );
}