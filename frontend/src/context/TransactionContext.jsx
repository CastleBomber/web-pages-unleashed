import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
const { ethereum } = window;
export const TransactionContext = React.createContext();

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

  const checkIfWalletIsConnected = async () => {
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
  };

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
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const balance = await provider.getBalance(account);
      setUserBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error(error);
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("please install metamask");

      const { addressTo, amount } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount); // Decimal to GWEI

      console.log(`Loading - A`);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", // 21000 GWEI
            value: parsedAmount._hex, // 0.00001
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

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      console.log(`Success - ${transactionHash.hash}`);
      setIsLoading(false);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());

      // Fetch updated transactions and balance
      getAllTransactions();
      getUserBalance(currentAccount);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // Polling mechanism to check balance changes
  useEffect(() => {
    const interval = setInterval(async () => {
      const currentBalance = await getUserBalance(currentAccount);
      if (lastCheckedBalance && currentBalance !== lastCheckedBalance) {
        window.location.reload(); // Reload page if balance has changed
      }
      setLastCheckedBalance(currentBalance);
    }, 5000); // Check every 5 seconds
    
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentAccount, lastCheckedBalance]);

  useEffect(() => {
    checkIfWalletIsConnected();
    if(currentAccount){
      getUserBalance(currentAccount);
      getAllTransactions();
    }
  }, [currentAccount, transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        getUserBalance,
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
