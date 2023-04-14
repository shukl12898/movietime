import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Other from "./pages/Other";
import MyWatchlists from "./pages/MyWatchlists";
import Search from "./pages/Search";
import Suggestions from "./pages/Suggestions";

function App() {
  return (
    <div>
      <Routes>
        {/* Root pages, located in /pages/ */}
        <Route path="/" element={<Home />} />
        <Route path="/other" element={<Other />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/MyWatchlists" element={<MyWatchlists />} />
        <Route path="/Search" element={<Search />} />
        <Route path ="/Suggestions/:num" element ={<Suggestions />} />
        {/* 404 page not found redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
