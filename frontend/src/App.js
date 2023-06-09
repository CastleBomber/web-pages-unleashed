/**
 * Author: CastleBomber
 * Project: Web-Pages-Unleashed
 *
 * Acknowledgements: Traversy Media's Youtube MERN stack series
 * 
 * Database users: (check backend/server.js)
 * 
 * To get app running:
 * - Development mode (localhost:3000) -
 * front & backend - npm run dev, from root
 * or
 * backend (login, register features) - npm run server, from root
 * frontened (website) - npm run client, from root
 *
 * - Production mode (localhost:5000) -
 * after a successful 'npm run build' in the frontend folder
 * front & backend - npm run start, from root
 *
 *
 * Tips:
 * Creates a React app with the contents a folder called frontend
 * npx create-react-app@latest frontend --template redux
 * 
 * cmd+D will change opening and closing tag simultaneously
 * cmd+D (+ D..) change multiple nearby instances of a name
 * cors-heroku error: open https://cors-anywhere.herokuapp.com/corsdemo
 *
 *
 * Debugger:
 * launch.json should be set to Node.js versus chrome
 *
 *
 * MongoDB Server:
 * const dotenv = require("dotenv").config();
 *
 * Watch out for:
 * In app, older syntax 'component', needs to be switched to 'element'
 * older syntax of 'Switch', need to be 'Router' surrounding 'Route'
 *
 * URL variables may need ending '/' added to function properly
 *
 * Bootstrap uses: public/index.html
 *
 * For multiple package.json files, the needed dependency will need
 * to be loaded up from the ~immediate directory (perhaps where npm* was called)
 * ex: frontend/src/App.js uses react-bootstrap.
 *     so frontend/package.json needs to show react-bootstrap
 *     ./package.json version not seen/used
 *
 * If ever getting errors from using BrowserRouter, ensure that each level of package.json
 * is equipped with all the needed dependencies (check if some have what other don't)
 *
 * MongoDB - Compass GUI, used with online website tools
 */

import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import PageRed from "./pages/PageRed/PageRed";
import PageGreen from "./pages/PageGreen/PageGreen";
import PageBlue from "./pages/PageBlue/PageBlue";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/PageRed" element={<PageRed />} />
              <Route path="/PageBlue" element={<PageBlue />} />
              <Route path="/PageGreen" element={<PageGreen />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
            </Routes>
          </div>
        </BrowserRouter>
        <ToastContainer />
      </>
    );
  }
}

export default App;
