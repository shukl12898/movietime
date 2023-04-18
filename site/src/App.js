import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Other from "./pages/Other";
import MyWatchlists from "./pages/MyWatchlists";
import Search from "./pages/Search";
import NavBar from './components/NavBar';

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
            {/* 404 page not found redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
    </ChakraProvider>

  );
}

export default App;
