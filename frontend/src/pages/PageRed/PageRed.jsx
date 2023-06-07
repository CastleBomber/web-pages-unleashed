import NavigationBar from "../../components/NavBar/Navbar";
import CardTileGroup from "../../components/Card/Card";
import tiles from "../../components/Card/card-info.json";
import Footer from "../../components/Footer/Footer";
import "./PageRed.css";

// music page
export const PageRed = () => {
  return (
    <div className="page-red">
      <nav>
        <NavigationBar className="navbar" />
      </nav>
      <main>
        <CardTileGroup tiles={tiles} className="card-tile-group" />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default PageRed;
