import React from "react";
import Footer from "../components/Footer";
import Balance from "../components/Balance";
import NavigationBar from "../components/Navbar";
import TransactionBCGifCards from "../components/TransactionBCGifCards";
import NetworkSwitcher from "../components/NetworkSwitcher";

export const Home = () => {
  return (
    <div className="home">
      <nav>
        <NavigationBar className="navbar" />
      </nav>

      {/* Web3 Crytpto Section */}
      <header>
        <NetworkSwitcher />
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
