import React, { useContext } from "react";
import Footer from "../components/Footer";
import Balance from "../components/Balance";
import NavigationBar from "../components/Navbar";
import Card from "../components/Card";
import tiles from "../utils/card-info.json";
import "../utils/card-info.json";
import { TransactionContext } from "../context/TransactionContext";
import { AiFillPlayCircle } from "react-icons/ai";

export const Home = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransaction,
    handleChange,
    isLoading,
  } = useContext(TransactionContext);

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
        <Card tiles={tiles} className="card-tile-group" />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
