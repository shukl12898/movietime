import React from "react";
import { useNavigate } from "react-router-dom";
import OneWatchlist from "../components/OneWatchlist";
import MultipleWatchlists from "../components/MultipleWatchlists";

// This page provides a button with a redirect to "/other"
function MyWatchlists() {
  // fetchResponse is a constant in this component's state. Use handleFetchResponse(newValue)
  // to update the value of fetchResponse

  // Calling navigate() will allow us to redirect the webpage
  const navigate = useNavigate();

  // Anything returned will be rendered in React
  return (
    <div>
      <div>MyWatchlists Page</div>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        Click to go to Home page
      </button>
      <div>
        <OneWatchlist/>
        <MultipleWatchlists/>
      </div>
    </div>
  );
}

export default MyWatchlists;
