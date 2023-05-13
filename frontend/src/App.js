/**
 * Author: CastleBomber
 * Project: Mern-Tutorial
 * Date: March 16th, 2023
 *
 * Acknowledgements: Traversy Media's Youtube MERN stack series
 *
 *
 * Tips:
 * Creates a React app with the contents a folder called frontend
 * npx create-react-app@latest frontend --template redux
 *
 * To get app running:
 * npm run client (for this project, run from root folder; starts frontend)
 * (same as using: npm run start  while in the 'frontend' folder)
 *
 * cmd+D will change opening and closing tag simultaneously
 * cmd+D (+ D..) change multiple nearby instances of a name
 * cors-heroku error: open https://cors-anywhere.herokuapp.com/corsdemo
 *
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
 * For image carousel, keep images 1920w x 800h to prevent page resizing
 *
 * If ever getting errors from using BrowserRouter, ensure that each level of package.json
 * is equipped with all the needed dependencies (check if some have what other don't)
 */

import React, { Component } from "react";
import { Home } from "./components/Home/Home";
import { PageBlue } from "./components/PageBlue/PageBlue";
import { PageRed } from "./components/PageRed/PageRed";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/PageRed" element={<PageRed />} />
            <Route path="/PageBlue" element={<PageBlue />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
