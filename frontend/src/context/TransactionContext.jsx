import { useWeb3React } from "@web3-react/core";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddresses } from "../utils/constants";
import { toast } from "react-toastify";
const { ethereum } = window;
export const TransactionContext = React.createContext();
const Big = require("big.js");
const DEFAULT_CHAIN_ID = 11155111; // Sepolia as default

const getEthereumContract = (chainId = DEFAULT_CHAIN_ID) => {
  if (!chainId) {
    console.warn("No chainId provided, using default");
    chainId = DEFAULT_CHAIN_ID;
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  if (
    !contractAddresses ||
    !contractAddresses.sepolia ||
    !contractAddresses.holesky
  ) {
    throw new Error("Contract addresses not configured properly");
  }

  // If chainId is X, then use contractAddresses.s/h
  const contractAddress =
    chainId === 11155111
      ? contractAddresses.sepolia // Sepolia chainId
      : chainId === 17000
        ? contractAddresses.holesky // Holesky chainId
        : null; // Handle unsupported networks

  if (!contractAddress) {
    throw new Error(`Unsupported network with chainId: ${chainId}`);
  }

  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  console.log("Current chainId:", chainId);
  console.log("Contract addresses", contractAddresses);

  return transactionContract;
};

// Creates the POST request to MongoDB
const logTransactionToDB = async (
  walletAddress,
  recipient,
  amount,
  transactionHash
) => {
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
};

export const TransactionProvider = ({ children }) => {
  // In your context provider
  const { chainId } = useWeb3React();

  const [currentAccount, setCurrentAccount] = useState("");
  const [userBalance, setUserBalance] = useState("");
  const [lastCheckedBalance, setLastCheckedBalance] = useState("");

  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
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
  const getAllTransactions = useCallback(async () => {
    try {
      if (!ethereum) {
        return alert("Please install metamask");
      }

      const transactionContract = getEthereumContract(chainId);

      const availableTransactions =
        await transactionContract.getAllTransactions();

      const structuredTransactions = availableTransactions.map(
        (transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      );

      setTransactions(structuredTransactions);
    } catch (error) {
      console.log(error);
    }
  }, [chainId]);

  const getUserBalance = useCallback(async (account) => {
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
  }, []);

  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      if (!ethereum) {
        console.log("Metamask not detected, please install.");
        return false;
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getUserBalance(accounts[0]);
        getAllTransactions();

        return true;
      }

      console.log("Wallet available but not connected");
      return false;
    } catch (error) {
      console.log("Connection check error:", error);
      return false;
    }
  }, [getAllTransactions, getUserBalance]);

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

  const switchNetwork = async (targetChainId) => {
    try {
      console.log("Attempting to switch to chainId:", targetChainId);

      if (!window.ethereum) {
        throw new Error("Metamask not installed");
      }

      // Validate that target chain is supported
      if (![11155111, 17000].includes(targetChainId)) {
        throw new Error(`Chain ID: ${targetChainId} not supported`);
      }

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      });

      // Refresh contract and data after switch
      if (currentAccount) {
        await getUserBalance(currentAccount);
        await getAllTransactions();
      }

      toast.success(
        `Switched to ${targetChainId === 11155111 ? "Sepolia" : "Holesky"}`
      );
    } catch (error) {
      console.error("Failed to switch netowrk:", error);
      toast.error(`Failed to switch network: ${error.message}`);

      // Add network if not found
      if (error.code === 4902) {
        try {
          await addNetwork(targetChainId);
          // Retry after adding
          await switchNetwork(targetChainId);
        } catch (addError) {
          console.log("Failed to add network:", addError);
        }
      }
    }
  };

  const addNetwork = async (chainId) => {
    const networkConfig = {
      11155111: {
        // Sepolia
        chainId: `0x${(11155111).toString(16)}`,
        chainName: "Sepolia Test Network",
        nativeCurrency: { name: "Sepolia ETH", symbol: "ETH", decimals: 18 },
        rpcUrls: [
          `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_SEPOLIA_FRONTEND_REACT_APP_API_KEY}`,
        ],
        blockExplorerUrls: ["https://sepolia.etherscan.io"],
      },
      17000: {
        // Holesky
        chainId: `0x${(17000).toString(16)}`,
        chainName: "Holesky Test Network",
        nativeCurrency: { name: "Holesky ETH", symbol: "ETH", decimals: 18 },
        rpcUrls: ["https://ethereum-holesky.publicnode.com"],
        blockExplorerUrls: ["https://holesky.etherscan.io"],
      },
    };

    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [networkConfig[chainId]],
    });
  };

  const sendTransaction = async () => {
    try {
      // 1. Validate prerequisites
      if (!ethereum) {
        toast.error("Metamask is not installed");
        return;
      }

      if (!currentAccount) {
        toast.error("Please connect wallet first");
        return;
      }

      if (!formData.addressTo || !ethers.utils.isAddress(formData.addressTo)) {
        toast.error("Invalid recipient address");
        return;
      }
    
      if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
        toast.error("Invalid amount");
        return;
      }

      // 2. Ensure correct network
      if (![11155111, 17000].includes(chainId)) {
        // Auto-switch to default network if none selected
        await switchNetwork(DEFAULT_CHAIN_ID);
        toast.info("Automatically switched to Sepolia network");
        return; // Let user retry after switch
      }

      const { addressTo, amount, keyword, message } = formData;

      console.log("Transaction initiated with:", {
        from: currentAccount,
        to: formData.addressTo,
        amount: formData.amount,
        chainId,
      });

      // 3. Get contract instance
      const transactionContract = getEthereumContract(chainId);

      // 4. Convert parsed amount to wei
      const parsedAmount = new Big(amount).times(1e18).toFixed(0); // Convert Ether to Wei
      const hexValue = `0x${parseInt(parsedAmount, 10).toString(16)}`; // Convert to hex

      // 5. Estimate gas
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

      console.log("Gas estimage:", gasLimit);

      // 6. Send transaction
      const transactionHash = await ethereum.request({
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

      console.log("Transaction hash:", transactionHash);
      toast.success(
        `Transaction sent! Hash: ${transactionHash.slice(0, 8)}...`
      );

      // 7. Wait for blockchain confirmation
      const receipt =
        await transactionContract.provider.waitForTransaction(transactionHash);
      console.log("Transaction mined:", receipt);

      // 8. Update contract state
      await transactionContract.addToBlockChain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      // Wait for confirmation
      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      console.log(`Success - ${transactionHash.hash}`);
      setIsLoading(false);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());

      // Log the transaction to backend
      logTransactionToDB(
        currentAccount,
        addressTo,
        amount,
        transactionHash.hash
      );
    } catch (error) {
      console.error("Full transaction error:", {
        error,
        message: error.message,
        stack: error.stack,
      });
      toast.error(`Failed: ${error.message}`);
    }
  };

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
  }, [currentAccount, lastCheckedBalance, getUserBalance]);

  useEffect(() => {
    checkIfWalletIsConnected();
    if (currentAccount) {
      getUserBalance(currentAccount);
      getAllTransactions();
    }
  }, [
    currentAccount,
    transactionCount,
    checkIfWalletIsConnected,
    getUserBalance,
    getAllTransactions,
  ]);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        switchNetwork,
        currentAccount,
        userBalance,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        transactions,
        isLoading,
        transactionCount,
        getAllTransactions,
        currentChainId: chainId,
        currentNetwork:
          chainId === 11155111
            ? "Sepolia"
            : chainId === 17000
              ? "Holesky"
              : "Not Connected",
        isSupportedNetwork: [11155111, 17000].includes(chainId),
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
