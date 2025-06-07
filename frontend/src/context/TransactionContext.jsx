import { useWeb3React } from "@web3-react/core";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddresses } from "../utils/constants";
import { toast } from "react-toastify";
//const { ethereum } = window;
export const TransactionContext = React.createContext();
const Big = require("big.js");
const DEFAULT_CHAIN_ID = 11155111; // Sepolia as default

const getEthereumContract = (chainId) => {
  // Validate chainId or use default
  const validatedChainId = [11155111, 17000].includes(chainId)
    ? chainId
    : DEFAULT_CHAIN_ID;

  if (chainId !== validatedChainId) {
    console.warn(`Invalid chainId (${chainId}), using ${validatedChainId}`);
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const networkName = validatedChainId === 11155111 ? "sepolia" : "holesky";
  const contractAddress = contractAddresses[networkName];

  if (!contractAddress) {
    throw new Error(`No contract deployed on ${networkName}`);
  }

  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  console.log(`Using ${networkName} contract:`, contractAddress);

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
  const { chainId: web3ChainId } = useWeb3React();
  const [currentChainId, setCurrentChainId] = useState(DEFAULT_CHAIN_ID);

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
      if (!window.ethereum) {
        toast.error("MetaMask not connected");
        return;
      }

      // First verify contract deployment
      const networkName = currentChainId === 11155111 ? "Sepolia" : "Holesky";
      const isDeployed = await verifyContractDeployment(currentChainId);

      if (!isDeployed) {
        toast.error(`Contract not deployed on ${networkName}`);
        return;
      }

      // Proceed with transaction loading
      const transactionContract = getEthereumContract(currentChainId);
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
  }, [currentChainId]);

  const getUserBalance = useCallback(async (account) => {
    // Validate that account is not empty or undefined
    if (!account || account.trim() === "") {
      console.error("Invalid account address provided to getUserBalance()");
      return null;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
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
      if (!window.ethereum) {
        console.log("Metamask not detected, please install.");
        return false;
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

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

  // Wait for MetaMask injection (retry if not immediately available)
  async function checkMetaMask() {
    // Check if already injected
    if (window.ethereum?.isMetaMask) {
      return window.ethereum;
    }

    // Wait for injection (with timeout)
    return new Promise((resolve) => {
      let attempts = 0;
      const maxAttempts = 10; // ~2 seconds total

      const interval = setInterval(() => {
        if (window.ethereum?.isMetaMask) {
          clearInterval(interval);
          resolve(window.ethereum);
        } else if (attempts >= maxAttempts) {
          clearInterval(interval);
          console.log("MetaMask injection timed out");
        }
        attempts++;
      }, 200); // Check every 200ms
    });
  }

  const connectWallet = async () => {
    try {
      // Ensure MetaMask is injected
      const ethereum = await checkMetaMask();

      // Check if already connected
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        return accounts[0];
      }

      // If not connected, request new connection
      const newAccounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", newAccounts[0]);

      setCurrentAccount(newAccounts[0]);

      return newAccounts[0];
    } catch (error) {
      console.error("MetaMask connection failed:", error);
      toast.error(
        error.message.includes("timed out")
          ? "MetaMask took too long to respond. Try refreshing."
          : "Failed to connect MetaMask"
      );
      throw error;
    }
  };

  const switchNetwork = useCallback(
    async (targetChainId, showToast = true) => {
      try {
        console.log("Attempting to switch to chainId:", targetChainId);

        if (!window.ethereum) {
          throw new Error("Metamask not installed");
        }

        // Validate that target chain is supported
        if (![11155111, 17000].includes(targetChainId)) {
          throw new Error(`Chain ID: ${targetChainId} not supported`);
        }

        // Request network switch
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${targetChainId.toString(16)}` }],
        });

        // Verify switch completed
        const newChainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        if (parseInt(newChainId) !== targetChainId) {
          throw new Error("Network switch not confirmed");
        }

        // Refresh contract and data after switch
        if (currentAccount) {
          await Promise.all([
            getUserBalance(currentAccount),
            getAllTransactions(),
          ]);
        }

        if (showToast) {
          toast.success(
            `Switched to ${targetChainId === 11155111 ? "Sepolia" : "Holesky"}`
          );
        }

        setCurrentChainId(targetChainId);
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
    },
    [currentAccount, getUserBalance, getAllTransactions]
  );

  const addNetwork = async (chainId) => {
    const networkConfig = {
      11155111: {
        // Sepolia
        chainId: `0x${(11155111).toString(16)}`,
        chainName: "Sepolia Test Network",
        nativeCurrency: { name: "Sepolia ETH", symbol: "ETH", decimals: 18 },
        rpcUrls: [process.env.REACT_APP_ALCHEMY_SEPOLIA_URL],
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

  const verifyContractDeployment = async (chainId) => {
    try {
      const networkName = chainId === 11155111 ? "sepolia" : "holesky";
      const contractAddress = contractAddresses[networkName];

      if (!contractAddress) {
        console.warn(`No contract address for ${networkName}`);
        return false;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const code = await provider.getCode(contractAddress);

      console.log(
        `[${networkName}] Contract ${contractAddress} deployed:`,
        code !== "0x"
      );

      return code !== "0x";
    } catch (error) {
      console.error(`Verification failed for chain ${chainId}:`, error);
      return false;
    }
  };

  const sendTransaction = async () => {
    try {
      // 1. Validate prerequisites
      if (!window.ethereum) {
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

      if (
        !formData.amount ||
        isNaN(formData.amount) ||
        Number(formData.amount) <= 0
      ) {
        toast.error("Invalid amount");
        return;
      }

      // 2. Network validation with auto-switch
      if (![11155111, 17000].includes(currentChainId)) {
        try {
          await switchNetwork(DEFAULT_CHAIN_ID);
          toast.info(
            `Switched to default network. Please try your transaction again.`
          );
        } catch (switchError) {
          toast.error(`Failed to switch networks: ${switchError.message}`);
        }
        return;
      }

      // 3. Prepare transaction data
      const { addressTo, amount, keyword, message } = formData;
      const parsedAmount = new Big(amount).times(1e18).toFixed(0);
      const hexValue = `0x${parseInt(parsedAmount, 10).toString(16)}`;

      // 4. Get contract instance
      const transactionContract = getEthereumContract(currentChainId);

      // 5. Estimate gas
      const estimatedGas =
        await transactionContract.estimateGas.addToBlockChain(
          addressTo,
          parsedAmount,
          message,
          keyword,
          { value: hexValue }
        );

      // 6. Transaction execution
      const tx = await transactionContract.addToBlockChain(
        addressTo,
        parsedAmount,
        message,
        keyword,
        {
          value: hexValue,
          gasLimit: estimatedGas.mul(2),
        }
      );

      setIsLoading(true);
      const receipt = await tx.wait();

      // 7. Update all data
      await Promise.all([
        getUserBalance(currentAccount),
        getAllTransactions(),
        logTransactionToDB(currentAccount, addressTo, amount, tx.hash),
      ]);

      // 8. Success message
      toast.success(`Transaction mined! Block: ${receipt}`);

      // Transaction count update
      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
    } catch (error) {
      console.error("Transaction error:", error);

      toast.error(`Failed: ${error?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
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

  // Sync chainId from web3React with local state
  useEffect(() => {
    if (web3ChainId && [11155111, 17000].includes(web3ChainId)) {
      setCurrentChainId(web3ChainId);
    }
  }, [web3ChainId]);

  // Chain change event listener
  useEffect(() => {
    const handleChainChanged = (newChainId) => {
      const numericChainId = parseInt(newChainId, 16);
      switchNetwork(numericChainId, false);

      // Force reload all data on chain change
      if (currentAccount) {
        getAllTransactions();
        getUserBalance(currentAccount);
      }
    };

    window.ethereum?.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum?.removeListener("chainChanged", handleChainChanged);
    };
  }, [currentAccount, getAllTransactions, getUserBalance, switchNetwork]);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        switchNetwork: (chainId, showToast) =>
          switchNetwork(chainId, showToast),
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
        currentChainId,
        currentNetwork:
          currentChainId === 11155111
            ? "Sepolia"
            : currentChainId === 17000
              ? "Holesky"
              : "Not Connected",
        isSupportedNetwork: [11155111, 17000].includes(currentChainId),
        verifyContractDeployment,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
