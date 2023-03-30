import React from "react";
import { useNavigate } from "react-router-dom";


// This page provides a button with a redirect to "/other"
function Home() {
  // Calling navigate() will allow us to redirect the webpage
  const navigate = useNavigate();

  // Anything returned will be rendered in React
  return (
    <div>
      <div>Home Page</div>
      <button
        onClick={() => {
          navigate("/other");
        }}
      >
        Click to go to Other page
      </button>
      <button
              onClick={() => {
                navigate("/Login");
              }}
            >
              Click to go to Login page
       </button>
       <button
           onClick={() => {
             navigate("/Search");
           }}>
              Click to go to Search page
       </button>

    </div>
  );
}

export default Home;