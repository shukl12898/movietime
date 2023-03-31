import React from "react";
//import { useNavigate } from "react-router-dom";

// function OneWatchlist() {
//     return <h1>I am one watchlist</h1>;
// }
// export default OneWatchlist;

// const movies = [
//   { title: 'Fight Club', des: "hi1", id: 1 },
//   { title: 'Avatar', des: "hi2", id: 2 },
//   { title: 'Train', des: "hi3", id: 3 },
// ];

export default function OneWatchlist(props) {
  const listItems = props.movies.map(movie =>
    <li
      key={movie.id}
      style={{
        color: (movie.id % 2 == 0) ? 'magenta' : 'darkgreen'
      }}
    >
      {movie.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}