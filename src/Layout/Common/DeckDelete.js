import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api/index";
import ErrorMessage from "../Common/ErrorMessage";

export default function DeckDelete({ decks, deckId, error, setError, setDecks }) {
  const abortController = new AbortController();
  const history = useHistory();

  function handleDelete(event) {
    event.preventDefault();
    const answer = window.confirm(
      "Delete the deck?\n\nYou will not be able to recover it."
    );

    if (answer) {
      deleteDeck(deckId, abortController.signal)
        .then(() => {
          const filteredDecks = decks.filter((selected) => selected.id !== deckId);
          setDecks(() => {
            return [...filteredDecks];
          });
        })
        .then(history.push("/"))
        .catch((e) => {
          setError(() => e);
          console.log(e);
        });
    }
  }

  if (error) {
    return <ErrorMessage setError={setError} />;
  }

  return (
    <button
      type="button"
      className="btn btn-danger float-right"
      onClick={handleDelete}
    >
      <span className="oi oi-trash" />
    </button>
  );
}