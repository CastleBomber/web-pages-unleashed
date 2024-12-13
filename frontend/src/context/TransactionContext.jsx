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

      console.log(structuredTransactions);

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
      //const parsedAmount = ethers.utils.parseEther(amount); // Decimal to GWEI
      const parsedAmount = new Big(amount).times(1e18).toFixed(0); // Convert to Wei (e.g., Ether to Wei)
      const hexValue = `0x${parseInt(parsedAmount, 10).toString(16)}`; // Convert to hex

      console.log(`Loading - A`);

      // Dynamically estimates gas to use
      const gasLimit = await ethereum.request({
        method: "eth_estimateGas",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            //value: parsedAmount._hex,
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
            //gas: "0x5208", // 21000 GWEI
            gas: gasLimit, 
            //value: parsedAmount._hex, // 0.00001
            value: hexValue,
          },
        ],
      });

      console.log(
        `Loading - Before transactionHash = await transactionContract.addToBlockChain()`
      );

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount
      );

      console.log(
        `Loading - After transactionHash = await transactionContract.addToBlockChain()`
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
      logTransactionToDB(tx, receipt);
    } catch (error) {
      console.log(error);
    }
  };

  // Creates the POST request
  async function logTransactionToDB(tx, receipt) {
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: tx.from, // Sender's address
          recipient: tx.to, // Recipient's address
          amount: ethers.utils.formatEther(tx.value), // Amount in Ether
          transactionHash: tx.hash,
          status: receipt.status, // Transaction status (1 = success)
          timestamp: new Date().toISOString(),
        }),
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
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
