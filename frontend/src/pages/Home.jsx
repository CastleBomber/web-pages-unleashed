import React, { useContext } from "react";
import Footer from "../components/Footer";
import Balance from "../components/Balance";
import NavigationBar from "../components/Navbar";
import Slider from "../components/Slider";
import slides from "../utils/mock.json";
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
        <Slider slides={slides} className="carousel" />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
