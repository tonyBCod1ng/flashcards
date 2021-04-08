import React, { Fragment, useState, useEffect } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import ErrorMessage from "../Common/ErrorMessage";
import { createCard, readCard, updateCard } from "../../utils/api/index";

export default function AddEditCard({
  edit,
  deck,
  setDeck,
  deckUrl,
  deckId,
  error,
  setError,
}) {
  const [formData, setFormData] = useState({});
  const [card, setCard] = useState({});
  const abortController = new AbortController();
  const history = useHistory();
  const newDeck = { ...deck };
  const {
    params: { cardId },
  } = useRouteMatch();

  useEffect(() => {
    if (edit) {
      readCard(cardId, abortController.signal)
        .then((response) => {
          setCard(() => ({ ...card, ...response }));
        })
        .catch(setError);
    } else {
      setCard(() => ({ ...card, front: "", back: "" }));
    }
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    setFormData(() => ({
      ...formData,
      ...card,
    }));
  }, [card]);

  function changeHandler({ target }) {
    setFormData(() => ({ ...formData, [target.name]: target.value }));
  }

  function submitHandler(event) {
    event.preventDefault();
    if (edit) {
      updateCard(formData, abortController.signal)
        .then((response) => {
          const index = deck.cards.findIndex((selected) => selected.id === card.id);
          newDeck.cards[index] = response;
          setDeck(() => ({ ...newDeck }));
        })
        .then(history.push(deckUrl))
        .catch((e) => {
          setError(() => e);
          console.log(e);
        });
    } else {
      createCard(deckId, formData, abortController.signal)
        .then((response) => {
          newDeck.cards.push(response);
          setDeck(() => ({ ...newDeck }));
        })
        .then(() => setFormData(() => ({ ...formData, front: "", back: "" })))
        .catch((e) => {
          setError(() => e);
          console.log(e);
        });
    }
    return () => abortController.abort();
  }

  if (error) {
    return <ErrorMessage setError={setError} />;
  }

  return (
    <Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={deckUrl}>{deck.name}</Link>
          </li>
          {edit ? (
            <li className="breadcrumb-item active" aria-current="page">
              Edit Card {cardId}
            </li>
          ) : (
            <li className="breadcrumb-item active" aria-current="page">
              Add Card
            </li>
          )}
        </ol>
      </nav>

      {/* {edit ? <h2>{`${deckCurrent.name}`}</h2><h2>: </h2><h2>Add Card</h2>} */}

      {/* <h2>{deckCurrent.name}: Add Card</h2> */}

      {edit ? <h2>Edit Card</h2> : <h2>{deck.name}: Add Card</h2>}
      <form name="addCard" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Front</label>
          <textarea
            name="front"
            value={formData.front}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Front side of card"
            onChange={changeHandler}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Back</label>
          <textarea
            name="back"
            value={formData.back}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Back side of card"
            onChange={changeHandler}
            required
          ></textarea>
        </div>
        <Link className="btn btn-secondary mr-1" to={deckUrl}>
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Fragment>
  );
}