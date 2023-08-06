import React, { useContext } from "react";
import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";
import Slider from "../components/Slider";
import slides from "../utils/mock.json";
import Spinner from "../components/Spinner";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
  />
);

export const Home = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransaction,
    handleChange,
    isLoading,
  } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  return (
    <div className="home">
      <nav>
        <NavigationBar className="navbar" />
      </nav>
      <header>
        {/* Web3 Crytpto Section */}
        <h1>Send Crypto</h1>
        <h2>Account Balance</h2>

        {/* Crypto Wallet sign in button */}
        {!currentAccount && (
          <button type="button" onClick={connectWallet}>
            <AiFillPlayCircle />
            <p>Connect Wallet</p>
          </button>
        )}

        {/* Display balances */}
        <div>
          <div>
            <SiEthereum fontSize={21} color="#fff" />
          </div>
          <BsInfoCircle fontSize={17} color="#fff" />
          <div>
            <p>{shortenAddress(currentAccount)}</p>
            <p>Ethereum</p>
          </div>

          {/* User input */}
          <div>
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handleChange={handleChange}
            />

            {isLoading ? (
              <Spinner />
            ) : (
              <button type="button" onClick={handleSubmit}>
                Send now
              </button>
            )}
          </div>
        </div>
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
