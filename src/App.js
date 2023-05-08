import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import ViewMovie from "./pages/ViewMovie";
import ProcessPayment from "./pages/ProcessPayment";
import SeatPicker from "./pages/SeatPicker";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Food from "./pages/Food"
import Footer from "./layout/Footer";

function App() {
  const [movieTitle, setMovieTitle] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8080/movie/data")
      .then(response => {
        setMovieTitle(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="App">
      <Router>
        <Navbar placeholder="Enter Movie Name" data={movieTitle} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/adduser" element={<AddUser />} />
          <Route exact path="/payment" element={<ProcessPayment />} />
          <Route exact path="/seat" element={<SeatPicker />} />
          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path="/viewmovie/:id" element={<ViewMovie />} />
          <Route exact path="/food" element={<Food />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
