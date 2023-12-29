import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";
import CardTileGroup from "../components/Card";
import tiles from "../utils/card-info.json";

// Music page
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
