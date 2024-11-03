import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Recall from "./components/recall.component";
import RecallList from "./components/recall-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/recalls"} className="navbar-brand">
            Autoware Recall App
          </Link>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<RecallList/>} />
            <Route path="/recalls" element={<RecallList/>} />
            <Route path="/recalls/:id" element={<Recall/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;