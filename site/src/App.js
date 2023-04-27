import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MyWatchlists from "./pages/MyWatchlists";
import Search from "./pages/Search";
import Suggestions from "./pages/Suggestions";
import Montage from "./pages/Montage"
import NavBar from "./components/NavBar";
import {useState, useEffect} from "react";

import { ChakraProvider } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";



function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [name, setName] = useState("");
     //const navigate = useNavigate();


    const toggleLogIn = () => {
        setLoggedIn(!loggedIn);
    };

    const checkNameInSessionStorage = () => {
        const storedName = sessionStorage.getItem('displayName');
        if (storedName) {
          console.log('App render. Name rendered: ', storedName);
          setName(storedName);
        } else {
          console.log('App render. No name found.');
          setName('');
          //navigate("/");
        }
    };

    useEffect(()=>{
        console.log("Rendering application...");
        checkNameInSessionStorage();
    },[loggedIn]);

  return (
    <ChakraProvider>
        <NavBar toggleLogIn={toggleLogIn} name={name}/>
        <div>
          {loggedIn && (
              <Routes>
                {/* Root pages, located in /pages/ */}
                <Route path="/" element={<Search />} />
                <Route path="/MyWatchlists" element={<MyWatchlists />} />
                <Route path="/Search" element={<Search />} />
                 <Route path ="/Suggestions/:num" element ={<Suggestions />} />
                 <Route path ="/Montage" element ={<Montage />} />
                {/* 404 page not found redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              )}
          {!loggedIn && (
            <Routes>
            <Route path="/" element={<Login toggleLogIn={toggleLogIn}/>} />
            <Route path="/Login" element={<Login toggleLogIn={toggleLogIn}/>} />
            <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </div>
    </ChakraProvider>

  );
}

export default App;
