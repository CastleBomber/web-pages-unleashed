import Slider from "../components/Slider";
import slides from "../utils/mock.json";
import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";

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
