import React, { Fragment, useState, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Study from "../Study/Study";
import { readDeck } from "../../utils/api/index";
import ViewNav from "./ViewNav";
import ManageDeck from "./ManageDeck";
import CardsList from "./CardsList";
import AddEditCard from "../Forms/AddEditCard";
import EditDeck from "../Forms/EditDeck";

export default function View({ decks, setDecks, error, setError }) {
  const [deck, setDeck] = useState({});
  const abortController = new AbortController();
  const {
    params: { deckId },
    url,
  } = useRouteMatch();

  useEffect(() => {
    readDeck(deckId, abortController.signal).then(setDeck).catch(setError);
    return () => abortController.abort();
  }, []);

  return (
    <Fragment>
      <Switch>
        <Route path={`${url}/cards/:cardId/edit`}>
          <AddEditCard
            edit={true}
            deck={deck}
            setDeck={setDeck}
            deckUrl={url}
            deckId={deckId}
            error={error}
            setError={setError}
          />
        </Route>
        <Route path={`${url}/cards/new`}>
          <AddEditCard
            edit={false}
            deck={deck}
            setDeck={setDeck}
            deckUrl={url}
            deckId={deckId}
            error={error}
            setError={setError}
          />
        </Route>
        <Route path={`${url}/edit`}>
          <EditDeck
            deck={deck}
            setDeck={setDeck}
            deckUrl={url}
            error={error}
            setError={setError}
          />
        </Route>
        <Route path={`${url}/study`}>
          <Study
            deckId={deckId}
            deck={deck}
            setDeck={setDeck}
            error={error}
            setError={setError}
          />
        </Route>

        <Route exact path={url}>
          <ViewNav deck={deck} />
          <ManageDeck
            deck={deck}
            decks={decks}
            error={error}
            setError={setError}
            setDecks={setDecks}
            deckId={deckId}
          />

          {Object.keys(deck).length > 0 ? (
            deck.cards.length > 0 ? (
              <h2 className="mb-3">Cards</h2>
            ) : (
              <h2>There are no cards in this deck yet.</h2>
            )
          ) : null}
          <CardsList
            error={error}
            setError={setError}
            setDeck={setDeck}
            deck={deck}
            url={url}
          />
        </Route>
      </Switch>
    </Fragment>
  );
}