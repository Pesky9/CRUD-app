import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import AddNotepage from "./AddNotepage/AddNotepage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/addNote" element={<AddNotepage />} />
      </Routes>
    </Router>
  );
};

export default App;
