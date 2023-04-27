import React from "react";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MyWatchlists from "./pages/MyWatchlists";
import Search from "./pages/Search";
import Suggestions from "./pages/Suggestions";

import { ChakraProvider } from '@chakra-ui/react'

function App() {
  const [selectedMovies, setSelectedMovies] = useState([]);
  return (
    <ChakraProvider>
        <div>
          <Routes>
            {/* Root pages, located in /pages/ */}
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/MyWatchlists" element={<MyWatchlists selectedMovies = {selectedMovies} setSelectedMovies = {setSelectedMovies} />} />
            <Route path="/Search" element={<Search />} />
             <Route path ="/Suggestions/:num" element ={<Suggestions selectedMovies={selectedMovies} setSelectedMovies={setSelectedMovies} />} />
            {/* 404 page not found redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
    </ChakraProvider>

  );
}

export default App;
