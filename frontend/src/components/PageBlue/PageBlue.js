import CardTileGroup from "../Card/Card";
import Slider from "../Slider/Slider";
import slides from "../Slider/mock.json";
import tiles from "../Card/card-info.json";
import NavigationBar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import "../NavBar/navbar.css";
import "./PageBlue.css";
import "../Slider/slider.css";
import "../Card/card.css";

// AI art or music page
export const PageBlue = () => {
  return (
    <div className="page-blue">
      <nav>
        <NavigationBar className="navbar" />
      </nav>
      <main>
        <Slider slides={slides} className="carousel" />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
