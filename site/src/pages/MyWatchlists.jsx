import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MultipleWatchlists from "../components/MultipleWatchlists";
//import WatchlistOptions from "../components/WatchlistOptions";
// This page provides a button with a redirect to "/other"

const multiList = [
{
  user_id: 1,
  watchlistName: "Action",
  isPublic: 1,
  moviesInW: [{
    title: 'Flight',
  }, {
    title: 'Train',
  }, {
    title: 'Plane',
  }, {
    title: 'Boat',
  }]
 },
{
  user_id: 1,
  watchlistName: "Comedy",
  isPublic: 1,
  moviesInW: [{
      title: 'Owl',
    }, {
      title: 'Bird',
    }, {
      title: 'Eagle',
    }, {
      title: 'Parrot',

    }]
}
];


function MyWatchlists() {
  const [user_id, setUserID] = useState("");
  const [watchlistName, setWName] = useState("");
  const [isPublic, setIsPublic] = useState("");
  const [movieName, setMovieName] = useState("");
  const [responseHold, setResponseHold] = useState("");
 //const [fetchResponse, handleFetchResponse] = useState();

  function handleUserIDChange(event) {
    setUserID(event.target.value);
  }

  function handleWNameChange(event) {
    setWName(event.target.value);
  }

  function handleIsPublicChange(event) {
    setIsPublic(event.target.value);
  }

  function handleMovieNameChange(event) {
    setMovieName(event.target.value);
  }

 // Anything returned will be rendered in React
return (
    <div>
      <h1>MyWatchlists</h1>
        <h2>Add to Watchlist</h2>
        <div>
          <label>User ID:</label>
          <input type="text" value={user_id} onChange={handleUserIDChange}/>
        </div>
        <div>
          <label>Watchlist Name:</label>
          <input type="text" value={watchlistName} onChange={handleWNameChange}/>
        </div>
        <div>
          <label>isPublic:</label>
          <input type="text" value={isPublic} onChange={handleIsPublicChange}/>
        </div>
        <div>
          <label>Movie:</label>
          <input type="text" value={movieName} onChange={handleMovieNameChange}/>
        </div>

        <div>
        <button onClick={() => {
                fetch("/api/watchlist", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                   "user_id" : user_id,
                   "watchlistName" : watchlistName,
                   "isPublic" : isPublic,
                   "movieName" : movieName
                   })
                })
                  .then(res => {return res.json()})
                  .then((response) => {
                      console.log("API Responded With: ");
                      console.log(response);
                      setResponseHold(response);
                  })
                  .catch(error => {
                    console.log(error)
                  });
              }}
              >Add Movie</button>

        </div>


        <h2>View My Watchlist</h2>
        <div>
          <label>UserID:</label>
          <input type="text" value={user_id} onChange={handleUserIDChange}/>
        </div>

        <div>
        <button onClick={() => {
                fetch("/api/watchlist", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                   "user_id" : user_id,
                   "watchlistName" : ""
                   })
                })
                  .then(res => {return res.json()})
                  .then((response) => {
                      console.log("API Responded With: ");
                      console.log(response);
                      setResponseHold(response);
                  })
                  .catch(error => {
                    console.log(error)
                  });
              }}
              >See My Watchlists</button>

             <div>
                <MultipleWatchlists watchlistsArr = {multiList} />
             </div>

        </div>
    </div>
  );
}

export default MyWatchlists;

{/*
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

        <MultipleWatchlists watchlistsArr = {multiList} />

      </div>


    </div>
  ); */}