import React from "react";
import Footer from "../components/Footer";
import Balance from "../components/Balance";
import NavigationBar from "../components/Navbar";
import "../utils/card-info.json";

export const Home = () => {

  return (
    <div className="home">
      <nav>
        <NavigationBar className="navbar" />
      </nav>

      {/* Web3 Crytpto Section */}
      <header>
        <Balance />
      </header>

      <main></main>
      <footer>
        <h3>Latest Blockchain Transaction from Users</h3>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
