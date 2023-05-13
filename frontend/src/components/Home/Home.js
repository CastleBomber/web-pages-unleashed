import CardTileGroup from "../Card/Card";
import Slider from "../Slider/Slider";
import slides from "../Slider/mock.json";
import tiles from "../Card/card-info.json";
import NavigationBar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import "../NavBar/navbar.css";
import "./Home.css";
import "../Slider/slider.css";
import "../Card/card.css";
import "../Footer/footer.css";

export const Home = () => {
  return (
    <div className="home">
      <nav>
        <NavigationBar className="navbar" />
      </nav>
      <header>
        <Slider slides={slides} className="carousel" />
      </header>
      <main>
        <CardTileGroup tiles={tiles} className="card-tile-group" />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
