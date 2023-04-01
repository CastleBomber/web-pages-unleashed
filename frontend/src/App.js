/**
 *  Author: CastleBomber
 *  Project: Mern-Tutorial
 *  Date: March 16th, 2023
 *
 *  Acknowledgements: Traversy Media's Youtube MERN stack series
 *
 *  Tips:
 *  Creates a React app with the contents a folder called frontend
 *  npx create-react-app@latest frontend --template redux
 *
 *  To get app running, affirm correct folder,
 *  (for this project, run from root folder)
 *  npm run client (starts frontend)
 *  (same as using: npm run start  while in the 'frontend' folder)
 *
 *
 *  cmd+D will change opening and closing tag simultaneously
 *  cmd+D (+ D..) change multiple nearby instances of a name
 *  cors-heroku error: open https://cors-anywhere.herokuapp.com/corsdemo
 *
 *  Watch out for:
 *  In app, older syntax 'component', needs to be switched to 'element'
 *  older syntax of 'Switch', need to be 'Router' surrounding 'Route'
 *
 *  URL variables may need ending '/' added to function properly
 *
 *  Bootstrap uses: public/index.html
 *
 *  For multiple package.json files, the needed dependency will need
 *  to be loaded up from the ~immediate directory (perhaps where npm* was called)
 *  ex: frontend/src/App.js uses react-bootstrap.
 *      so frontend/package.json needs to show react-bootstrap
 *      ./package.json version not seen/used
 */

import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Slider from "./components/layout/Slider";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import slides from './components/layout/mock.json'

function App() {
  return (
    <div className="App">
      <Slider slides={slides}/>
    </div>
  );
}

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <Slider />
//       </div>
//     );
//   }
// }

export default App;
