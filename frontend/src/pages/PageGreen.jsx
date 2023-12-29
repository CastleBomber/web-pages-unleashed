import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";
import CardTileGroup from "../components/Card";
import tiles from "../utils/card-info.json";

export const PageGreen = () => {
  return (
    <div className="page-green">
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

export default PageGreen;
