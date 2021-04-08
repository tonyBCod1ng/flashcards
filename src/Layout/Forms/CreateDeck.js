import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api/index";
import ErrorMessage from "../Common/ErrorMessage";

export default function CreateDeck({ decks, setDecks, error, setError }) {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const history = useHistory();
  const newDecks = [...decks];

  function changeHandler({ target }) {
    setFormData(() => ({ ...formData, [target.name]: target.value }));
  }

  function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    createDeck(formData, abortController.signal)
      .then((response) => {
        newDecks.push(response);
        setDecks(() => newDecks);
        history.push(`/decks/${response.id}`);
      })
      .catch(setError);
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
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <form name="addDeck" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Name</label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Deck Name"
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Description</label>
          <textarea
            required
            name="description"
            value={formData.description}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Deck Description"
            onChange={changeHandler}
          ></textarea>
        </div>
        <Link className="btn btn-secondary mr-1" to="/">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Fragment>
  );
}