import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MultipleWatchlists from "../components/MultipleWatchlists";
import SuggestionButton from "../components/SuggestionButton";
import NavBar from '../components/NavBar';

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
  const [responseHold, setResponseHold] = useState("");
 //const [fetchResponse, handleFetchResponse] = useState();

  function handleUserIDChange(event) {
    setUserID(event.target.value);
  }

  const navigate = useNavigate();

  // Anything returned will be rendered in React
return (
    <div>
    <NavBar/>
      <h2>MyWatchlists</h2>
      <button
              onClick={() => {
                navigate("/Home");
              }}
            >
              Click to go to Home page
            </button>

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
              >See My Watchlist</button>
              if (responseHold == null) ternary
             <div>

                <MultipleWatchlists watchlistsArr = {responseHold} />

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


      <SuggestionButton />
    </div>
  );
}

    </div>
  ); */}