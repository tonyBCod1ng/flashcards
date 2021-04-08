import React from "react";
import { Link } from "react-router-dom";

export default function ErrorMessage({ setError }) {
  setError(undefined);
  return (
    <div class="alert alert-danger" role="alert">
      <h4 class="alert-heading">An error occurred during your last request.</h4>
      <p>Please return to the home page and try again later.</p>
      <Link to="/">
        <h5 className="text-danger">
          <span className="oi oi-home" /> Go Home
        </h5>
      </Link>
    </div>
  );
}