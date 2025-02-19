import React, { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import { toast } from "react-toastify";
const { ethereum } = window;
export const TransactionContext = React.createContext();
const Big = require("big.js");

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [userBalance, setUserBalance] = useState("");
  const [lastCheckedBalance, setLastCheckedBalance] = useState("");

  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );

  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  // Transactions from the Blockchain
  const getAllTransactions = async () => {
    try {
      if (!ethereum) {
        return alert("Please install metamask");
      }

      const transactionContract = getEthereumContract();

      const availableTransactions =
        await transactionContract.getAllTransactions();

      const structuredTransactions = availableTransactions.map(
        (transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      );

      setTransactions(structuredTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      if (!ethereum) {
        return alert("Please install metamask");
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getUserBalance(accounts[0]);
        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object in checkIfWalletIsConnected()");
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("please install metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      getUserBalance(accounts[0]);
      getAllTransactions();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const getUserBalance = async (account) => {
    // Validate that account is not empty or undefined
    if (!account || account.trim() === "") {
      console.error("Invalid account address provided to getUserBalance()");
      return null;
    }
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const balance = await provider.getBalance(account);
      const formattedBalance = ethers.utils.formatEther(balance);
      setUserBalance(formattedBalance); // Update the state as needed
      return formattedBalance; // Return the balance for other uses
    } catch (error) {
      console.error("Error in getUserBalance():", error);
      return null;
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("please install metamask");

      const { addressTo, amount } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = new Big(amount).times(1e18).toFixed(0); // Convert Ether to Wei
      const hexValue = `0x${parseInt(parsedAmount, 10).toString(16)}`; // Convert to hex

      console.log(`Loading - A`);

      // Dynamically estimates gas to use
      const gasLimit = await ethereum.request({
        method: "eth_estimateGas",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            value: hexValue,
          },
        ],
      });

      const tx = await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount, // MetaMask account
            to: addressTo,
            gas: gasLimit,
            value: hexValue,
          },
        ],
      });

      console.log(
        `Loading - Before: transactionHash = await transactionContract.addToBlockChain()`
      );

      const transactionHash = await transactionContract.addToBlockChain(
        addressTo,
        parsedAmount
      );

      console.log(
        `Loading - After: transactionHash = await transactionContract.addToBlockChain()`
      );

      // Wait for confirmation
      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      const receipt = await transactionHash.wait();
      console.log(`Success - ${transactionHash.hash}`);
      setIsLoading(false);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());

      // Log the transaction to backend
      logTransactionToDB(currentAccount, addressTo, amount, transactionHash.hash);
    } catch (error) {
      console.log(error);
    }
  };

  // Creates the POST request to MongoDB
  async function logTransactionToDB(walletAddress, recipient, amount, transactionHash) {
    try {
      // Construct the POST request body
      const requestBody = {
        walletAddress,
        recipient,
        amount,
        transactionHash,
        status: "completed",
        timestamp: new Date().toISOString(),
      };

      // Send the POST request
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody), // Convert requestBody to JSON
      });

      if (!response.ok) {
        throw new Error(`Failed to log transaction: ${response.statusText}`);
      }
      console.log("Transaction logged successfully");
    } catch (error) {
      console.error("Error logging transaction:", error);
    }
  }

  // Polling mechanism to check balance changes
  useEffect(() => {
    if (!currentAccount) {
      return;
    }

    const interval = setInterval(async () => {
      const currentBalance = await getUserBalance(currentAccount);

      // Keep comparision logic (initially lastCheckedBalance will be undefined)
      if (lastCheckedBalance && currentBalance !== lastCheckedBalance) {
        toast.success("Balance updated", {
          position: "top-center",
          autoClose: 5000,
          pauseOnHover: true,
          theme: "colored",
        });
      }

      setLastCheckedBalance(currentBalance);
    }, 3000); // Check every 3 seconds

    // Suppress console warnings (Timer [Violation] X handlers)
    // Chrome Dev Filter Box: -[Violation]
    console.warn = () => {};

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentAccount, lastCheckedBalance]);

  useEffect(() => {
    checkIfWalletIsConnected();
    if (currentAccount) {
      getUserBalance(currentAccount);
      getAllTransactions();
    }
  }, [currentAccount, transactionCount, checkIfWalletIsConnected]);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        userBalance,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        transactions,
        isLoading,
        transactionCount,
        getAllTransactions
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
