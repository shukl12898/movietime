import React from "react";
import { useState } from 'react';

function CreateAccount() {

     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const [name, setName] = useState("");
     const [user, setUser] = useState();

    console.log(user);
     function handleUsernameChange(event) {
         setUsername(event.target.value);
     }

     function handlePasswordChange(event) {
         setPassword(event.target.value);
     }

     function handleNameChange(event) {
         setName(event.target.value);
     }

     function handleSubmit() {
        fetch("/api/createUser", {
            method: "POST",
            headers: {
             "Content-Type": "application/json"
            },
            body: JSON.stringify({
            username: username,
            password: password,
            name : name
            })
            })
            .then(res => res.json())
            .then((response) => {
               console.log("API Responded With: ");
               console.log(response);
               setUser(response);
            })
            .catch(error => {
             console.log(error)
            });
     };

     return (
          <form onSubmit={handleSubmit}>
               <label htmlFor="username">Username: </label>
               <input
                 type="text"
                 value={username}
                 placeholder="enter a username"
                 onChange={handleUsernameChange}
               />
               <div>
                 <label htmlFor="password">Password: </label>
                 <input
                   type="password"
                   value={password}
                   placeholder="enter a password"
                   onChange={handlePasswordChange}
                 />
               </div>
               <div>
                <label htmlFor="name">Name: </label>
                <input
                  value={name}
                  placeholder="enter a name"
                  onChange={handleNameChange}
                />
              </div>
               <button type="submit">Create Account</button>
             </form>
     )

}

export default CreateAccount;