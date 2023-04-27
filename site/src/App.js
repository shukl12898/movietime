import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MyWatchlists from "./pages/MyWatchlists";
import Search from "./pages/Search";
import Suggestions from "./pages/Suggestions";
import Montage from "./pages/Montage";

import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
        <div>
          <Routes>
            {/* Root pages, located in /pages/ */}
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/MyWatchlists" element={<MyWatchlists />} />
            <Route path="/Search" element={<Search />} />
             <Route path ="/Suggestions/:num" element ={<Suggestions />} />
             <Route path = "/Montage" element={<Montage />} />
            {/* 404 page not found redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
    </ChakraProvider>

  );
}

export default App;
