import React from "react";
import Footer from "../components/Footer";
import Balance from "../components/Balance";
import NavigationBar from "../components/Navbar";
import TransactionBCGifCards from "../components/TransactionBCGifCards";

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

      <main>
        <TransactionBCGifCards />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
