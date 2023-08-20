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
    const { addressTo, amount } = formData;

    e.preventDefault();

    if (!addressTo || !amount) return;

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
        <div className="crypto-card-container-1">
          <SiEthereum />
          <BsInfoCircle />
        </div>
        <div className="crypto-card-container-2">
          <div className="p1">{shortenAddress(currentAccount)}</div>
          <div className="p1">Ethereum</div>
        </div>
      </div>

      {/* Form for user inputs: address to and amount */}
      <Form className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label size="lg">Address to</Form.Label>
          <Input
            placeholder="Address To"
            name="addressTo"
            type="text"
            handleChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Input
            placeholder="Amount (ETH)"
            name="amount"
            type="number"
            handleChange={handleChange}
          />
        </Form.Group>

        {/* Loader */}
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="register-button mb-3">
            <Button onClick={handleSubmit} variant="primary" type="submit">
              Send Now
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default Balance;
