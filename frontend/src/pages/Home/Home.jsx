import CardTileGroup from "../../components/Card/Card";
import Slider from "../../components/Slider/Slider";
import slides from "../../components/Slider/mock.json";
import tiles from "../../components/Card/card-info.json";
import NavigationBar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer/Footer";
import "../../components/NavBar/navbar.css";
import "../../components/Slider/slider.css";
import "../../components/Card/card.css";

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

export default Home;
