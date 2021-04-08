import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import DeckDelete from "../Common/DeckDelete";

export default function ManageDeck({
  deck,
  deckId,
  decks,
  setDecks,
  error,
  setError,
}) {
  const { url } = useRouteMatch();

  return Object.keys(deck).length > 0 ? (
    <div className="card border-0">
      <div className="card-body px-0">
        <h4 className="card-title">{deck.name}</h4>
        <p className="card-text">{deck.description}</p>
        <Link className="btn btn-secondary mr-1" to={`${url}/edit`}>
          <span className="oi oi-pencil" /> Edit
        </Link>
        <Link className="btn btn-primary mr-1" to={`${url}/study`}>
          <span className="oi oi-book" /> Study
        </Link>
        <Link className="btn btn-primary mr-1" to={`${url}/cards/new`}>
          <span className="oi oi-plus" /> Add Card
        </Link>
        <DeckDelete
          decks={decks}
          error={error}
          setError={setError}
          setDecks={setDecks}
          deckId={deckId}
        />
      </div>
    </div>
  ) : null;
}