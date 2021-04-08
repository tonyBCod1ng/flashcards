import React from "react";
import { Link } from "react-router-dom";

export default function CreateDeckButton() {
  return (
    <Link className="btn btn-secondary mb-2" to="/decks/new">
      <span className="oi oi-plus" /> Create a deck
    </Link>
  );
}

