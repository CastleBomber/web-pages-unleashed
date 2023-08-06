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
 * Shortcuts:
 *  VS Code:
 *      code folding: cmd+k, cmd+2
 *      code expanding: cmd+k, release, cmd+j
 * 	    c++ VS Code clang-formatter: shift+alt+f
 *      Go to definition - F12
 *      Command pallete - shtift+cmd+p
 *
 *
 *  Visual Studio:
 *      code folding: select region, ctrl+m+m
 *      full screen: shift+alt+enter
 *      solution explorer: ctrl+alt+L
 *      (start debugger to access watchlist)
 *      watchlist: ctrl+alt+W,1
 *      add to watchlist: shift+F9
 *		  terminal: ctrl + `
 *
 *
 * Debugger:
 * launch.json should be set to Node.js versus chrome
 *
 *
 * MongoDB Server:
 * const dotenv = require("dotenv").config();
 *
 *
 * Web3:
 * smart-contract - npm init -y
 * npx hardhat (toolbox option) vs
 * npm install --save-dev hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
 *
 *
 * Watch out for:
 * Program not running with a bunch of error after downloading packages?
 * Then, delete package.json and node_modules. Run npm install after
 *
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
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageRed from "./pages/PageRed";
import PageGreen from "./pages/PageGreen";
import PageBlue from "./pages/PageBlue";
import "bootstrap/dist/css/bootstrap.min.css";

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
