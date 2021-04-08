import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import DeckDelete from "../Common/DeckDelete";

export default function DecksMap({ decks, error, setError, setDecks }) {
  return (
    <Fragment>
      {decks.map((deck) => (
        <div className="card mb-1" key={deck.id}>
          <div className="card-body">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="card-title">{deck.name}</h5>
              {deck.cards ? <small>{deck.cards.length} cards</small> : null}
            </div>
            <p className="card-text">{deck.description}</p>
            <Link className="btn btn-secondary mr-1" to={`/decks/${deck.id}`}>
              <span className="oi oi-eye" /> View
            </Link>
            <Link className="btn btn-primary" to={`/decks/${deck.id}/study`}>
              <span className="oi oi-book" /> Study
            </Link>
            {/* <button type="button" className="btn btn-danger float-right">
              <span className="oi oi-trash" />
            </button> */}
            <DeckDelete
              decks={decks}
              deckId={deck.id}
              error={error}
              setError={setError}
              setDecks={setDecks}
            />
          </div>
        </div>
      ))}
    </Fragment>
  );
}