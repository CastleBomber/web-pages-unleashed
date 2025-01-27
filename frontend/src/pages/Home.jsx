import React from "react";
import Footer from "../components/Footer";
import Balance from "../components/Balance";
import NavigationBar from "../components/Navbar";
import TransactionsHome from "../components/TransactionsHome";

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
        <TransactionsHome />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
