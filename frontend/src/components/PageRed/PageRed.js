import NavigationBar from "../NavBar/Navbar";
import CardTileGroup from "../Card/Card";
import tiles from "../Card/card-info.json";
import Footer from "../Footer/Footer";
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
