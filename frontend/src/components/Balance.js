import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "../components/Spinner";
import { TransactionContext } from "../context/TransactionContext";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { shortenAddress } from "../utils/shortenAddress";
//import { displayAddress } from "../utils/displayAddress";
import { AiFillPlayCircle } from "react-icons/ai";
import Web3 from "web3";
import tokenABI from "../utils/tokenABI";
//import Account from '../components/Account';

// Token Contract Addresses (not MetaMask Account Address)
const tokenAddresses = [
  {
    address: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43",  // From Etherscan
    token: "SepoliaETH",
  },
];

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

  const [accounts, setAccounts] = useState<AccountType[]>([]);
  const [web3Enabled, setWeb3Enabled] = useState(false);

  // Empty Web3 instance
  let web3 = new Web3();

  const ethEnabled = async () => {
    if (typeof window.ethereum !== "undefined") {
      // Instance web3 with the provided informaton
      web3 = new Web3(window.ethereum);
      try {
        // Request account access
        await window.ethreum.enable();
        return true;
      } catch (e) {
        // User denied access
        return false;
      }
    }

    return false;
  };

  const onClickConnect = async () => {
    if(await !ethEnabled()){
      alert("Please install Metamask before using the DApp");
    }

    setWeb3Enabled(true);

    // List of wallet account addresses
    var accs = await web3.eth.getAccounts();

    const newAccounts = await Promise.all(accs.map(async (address) => {
      const balance = await web3.eth.getBalance(address);

      const tokenBalances = await Promise.all(tokenAddress.map(async(token) => {
        const tokenInstant = new web3.eth.Contract(tokenABI, token.address);

        const balance = await tokenInstant.methods.balanceOf(address).call();

        return {
          token: token.token,
          balance
        }
      }))
    }))

    web3.utils.fromWei(balance, "ether");
  };

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
      <h2>Account Balance: 0.1906 SepoliaETH</h2>

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
