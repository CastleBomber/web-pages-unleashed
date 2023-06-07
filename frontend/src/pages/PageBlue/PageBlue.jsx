import CardTileGroup from "../../components/Card/Card";
import Slider from "../../components/Slider/Slider";
import slides from "../../components/Slider/mock.json";
import tiles from "../../components/Card/card-info.json";
import NavigationBar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer/Footer";
import "../../components/NavBar/navbar.css";
import "../../components/Slider/slider.css";
import "../../components/Card/card.css";
import "./PageBlue.css";

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

export default PageBlue;
