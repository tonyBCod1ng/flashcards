import React from "react";
import { deleteCard } from "../../utils/api/index";
import ErrorMessage from "../Common/ErrorMessage";

export default function CardDelete({ error, setError, deck, cardId, setDeck }) {
  const abortController = new AbortController();

  function handleDelete(event) {
    event.preventDefault();
    const answer = window.confirm(
      "Delete the card?\n\nYou will not be able to recover it."
    );
    if (answer) {
      deleteCard(cardId, abortController.signal)
        .then(() => {
          const filteredCards = deck.cards.filter(
            (selected) => selected.id !== cardId
          );
          setDeck(() => {
            return { ...deck, cards: filteredCards };
          });
        })
        .catch((e) => {
          setError(() => e);
          console.log(e);
        });
    }

    if (error) {
      return <ErrorMessage setError={setError} />;
    }
  }
  return (
    <button type="button" className="btn btn-danger ml-1" onClick={handleDelete}>
      <span className="oi oi-trash" />
    </button>
  );
}