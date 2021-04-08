import React, { useEffect, Fragment } from "react";
import { listDecks } from "../../utils/api/index";
import ErrorMessage from "../Common/ErrorMessage";
import DecksMap from "./DecksMap";
import CreateDeckButton from "./CreateDeckButton";

export default function Home({ decks, setDecks, error, setError }) {
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listDecks(signal)
      .then(setDecks)
      .catch((e) => {
        setError(() => e);
        console.log(e);
      });
    return () => abortController.abort();
  }, []);

  if (error) {
    return <ErrorMessage setError={setError} />;
  }

  return (
    <Fragment>
      <CreateDeckButton />
      <DecksMap
        decks={decks}
        setDecks={setDecks}
        error={error}
        setError={setError}
      />
    </Fragment>
  );
}