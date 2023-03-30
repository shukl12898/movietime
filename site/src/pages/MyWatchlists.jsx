import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OneWatchlist from "../components/OneWatchlist";
import MultipleWatchlists from "../components/MultipleWatchlists";

// This page provides a button with a redirect to "/other"

const moviesList = [{
  id: 0, // Used in JSX as a key
  title: 'Flight',
  des: 'mathematician',
}, {
  id: 1, // Used in JSX as a key
  title: 'Train',
  des: 'chemist',
}, {
  id: 2, // Used in JSX as a key
  title: 'Plane',
  des: 'physicist',
}, {
  id: 3, // Used in JSX as a key
  title: 'Boat',
  des: 'chemist',
}];

const multiList = [
{
  wName: "watchlist1",
  list: [{
    id: 0, // Used in JSX as a key
    title: 'Flight',
    des: 'mathematician',
  }, {
    id: 1, // Used in JSX as a key
    title: 'Train',
    des: 'chemist',
  }, {
    id: 2, // Used in JSX as a key
    title: 'Plane',
    des: 'physicist',
  }, {
    id: 3, // Used in JSX as a key
    title: 'Boat',
    des: 'chemist',
  }]
 },
{
  wName: "watchlist2",
  list: [{
      id: 4, // Used in JSX as a key
      title: 'Owl',
      des: 'mathematician',
    }, {
      id: 5, // Used in JSX as a key
      title: 'Bird',
      des: 'chemist',
    }, {
      id: 6, // Used in JSX as a key
      title: 'Eagle',
      des: 'physicist',
    }, {
      id: 7, // Used in JSX as a key
      title: 'Parrot',
      des: 'chemist',
    }]
}
];

function MyWatchlists() {
  // fetchResponse is a constant in this component's state. Use handleFetchResponse(newValue)
  // to update the value of fetchResponse
  const [fetchResponse, handleFetchResponse] = useState();

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
        {/* }<OneWatchlist movies = {moviesList} /> */}
        <MultipleWatchlists watchlistsArr = {multiList} />
      </div>
    </div>
  );
}

export default MyWatchlists;
