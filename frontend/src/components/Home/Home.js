import React from "react";
import CardTileGroup from "../Card/Card";
import Slider from "../Slider/Slider";
import slides from "../Slider/mock.json";
import tiles from "../Card/card-info.json";
import NavigationBar from "../NavBar/Navbar";
import "../NavBar/navbar.css";
import "./Home.css";
import "../Slider/slider.css";
import "../Card/card.css";

export const Home = () => {
  return (
    <div className="home">
      <nav>
        <NavigationBar className="navbar" />
      </nav>
      <main>
        <Slider slides={slides} className="carousel" />
      </main>
      <footer>
        <CardTileGroup tiles={tiles} className="card-tile-group" />
      </footer>
    </div>
  );
};
