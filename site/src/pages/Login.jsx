import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 // const [fetchResponse, handleFetchResponse] = useState();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
      setPassword(event.target.value);
    }
  const navigate = useNavigate();

  return (
    <div>
      <h2>Login</h2>
      <button
              onClick={() => {
                navigate("/Home");
              }}
            >
              Click to go to Home page
            </button>

        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange}/>
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
        <button onClick={() => {
                fetch("/api/login", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                   username: username,
                   password: password
                   })
                })
                  .then(res => res.json())
                  .then((response) => {
                      console.log("API Responded With: ");
                      console.log(response);
                  })
                  .catch(error => {
                    console.log(error)
                  });
              }}
              >Log In</button>
        </div>

    </div>
  );
}

export default Login;
