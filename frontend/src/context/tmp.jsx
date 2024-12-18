import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "../components/Spinner";
import { TransactionContext } from "../context/TransactionContext";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { shortenAddress, shortenBalance } from "../utils/shortenAddress";
import { AiFillPlayCircle } from "react-icons/ai";
import Account from "../components/Account";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    className="input"
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
  />
);

const Balance = () => {
  const {
    connectWallet,
    currentAccount,
    userBalance,
    formData,
    sendTransaction,
    handleChange,
    isLoading,
  } = useContext(TransactionContext);

  const [accounts, setAccounts] = useState([]);

  const handleSubmit = (e) => {
    const { addressTo, amount } = formData;

    e.preventDefault();

    if (!addressTo || !amount) {
      console.log("handleSubmit error: addressTo || amount");
      return;
    }

    sendTransaction();
  };

  return (
    <div className="balance">
      <h1>Send Crypto</h1>

      {accounts && accounts.length > 0 && (
        <div className="accounts">
          {accounts.map((account) => (
            <div className="account" key={account.address}>
              <Account account={account} />
            </div>
          ))}
        </div>
      )}

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
          <div className="p1">Balance: {shortenBalance(userBalance)}</div>
          <div className="p1">SepoliaETH</div>
        </div>
      </div>

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
