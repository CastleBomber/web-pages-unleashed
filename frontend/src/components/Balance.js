import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "../components/Spinner";
import { TransactionContext } from "../context/TransactionContext";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { shortenAddress } from "../utils/shortenAddress";
import { AiFillPlayCircle } from "react-icons/ai";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
  />
);

// Display Crytpo balances
const Balance = () => {
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
    <div className="balance">
      <h1>Send Crypto</h1>
      <h2>Account Balance</h2>

      {/* Sign in to crypto wallet */}
      {!currentAccount && (
        <Button onClick={connectWallet} className="mt-3 mb-3">
          <AiFillPlayCircle />
          <p>Connect Wallet</p>
        </Button>
      )}

      <div className="crypto-card mb-3">
        <SiEthereum fontSize={21} color="#fff" />
        <BsInfoCircle fontSize={17} color="#fff" />
        <p>{shortenAddress(currentAccount)}</p>
        <p>Ethereum</p>
      </div>

      {/* User inputs address to and amount */}
      <div className="mb-3">
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

      {/* Form version user input */}
      <Form className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label size="lg">Address to</Form.Label>
          <Form.Control
            placeholder="Enter address"
            size="lg"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            placeholder="Enter Amount (ETH)"
            size="lg"
          />
        </Form.Group>

        <div className="register-button">
          {isLoading ? (
            <Spinner />
          ) : (
            <Button variant="primary" type="submit">
              Send Now
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default Balance;
