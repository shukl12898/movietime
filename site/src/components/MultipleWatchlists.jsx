import React from "react";
import OneWatchlist from "../components/OneWatchlist";
//import { useNavigate } from "react-router-dom";

// function MultipleWatchlists() {
//     return <h1>I am mult watchlists</h1>;
// }
// export default MultipleWatchlists;

export default function MultipleWatchlists(props) {

  const listItems = props.watchlistsArr.map(watchlist =>
    <li
    key={watchlist.wName}>
    {watchlist.wName}
        <OneWatchlist movies={watchlist.list}/>
    </li>
  );


  return (
    <ul>{listItems}</ul>
  );
}