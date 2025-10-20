import React, { useState, useEffect, useContext } from "react";
import { shortenAddress, shortenDateFormat } from "../utils/shortenAddress";
import axios from "axios";
import { SiEthereum } from "react-icons/si";
//import { useTransactionContext } from "../context/TransactionContext";
import { TransactionContext } from "../context/TransactionContext";

// [Dashboard] Transactions pulled from database
const TransactionsDBCards = ({ loggedInUser }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [userMap, setUserMap] = useState({}); // Store address-to-username mapping
  const { dbRefreshFlag } = useContext(TransactionContext);

  useEffect(() => {
    if (!loggedInUser?.walletAddress) {
      setError("No wallet address found for logged-in user.");
      return;
    }

    // Fetch transactions for the logged-in user's walletAddress
    const fetchTransactions = async () => {
      try {
        console.log("🔄 Fetching transactions for", loggedInUser.walletAddress, "flag =", dbRefreshFlag);

        const response = await axios.get(`/api/transactions`, {
          params: {
            walletAddress: loggedInUser.walletAddress.toLowerCase(),
            t: Date.now(), // Cache buster
          },
        });

        // Sort the transactions by timestamp (newest first) and set the state
        const sortedTransactions = response.data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setTransactions(sortedTransactions);

        // Extract all unique addresses from transactions
        const allAddresses = new Set();

        sortedTransactions.forEach(txn => {
          allAddresses.add(txn.recipient.toLowerCase());
          allAddresses.add(txn.walletAddress.toLowerCase());
        });

        // Fetch usernames for all addresses
        if (allAddresses.size > 0) {
          const userResponse = await axios.post(`/api/users/usernames`, {
            addresses: Array.from(allAddresses)
          })
          setUserMap(userResponse.data);
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Error fetching transactions");
      }
    };

    // Delay to let DB update first
    const timer = setTimeout(fetchTransactions, 3000);

    return () => clearTimeout(timer);
  }, [loggedInUser, dbRefreshFlag]);

  useEffect(() => {
    console.log("useEffect triggered. dbRefreshFlag =", dbRefreshFlag);
  }, [dbRefreshFlag]);

  // Function to display address or username
  const displayAddress = (address) => {
    const normalizedAddress = address.toLowerCase();
    return userMap[normalizedAddress] || shortenAddress(address);
  };

  useEffect(() => {
    console.log("🔵 TransactionProvider mounted");
    return () => console.log("🔴 TransactionProvider unmounted");
  }, []); // useEffect callback runs once on mount because of the empty dependency array []

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div>
      <h2>User's Latest Database Transactions</h2>
      {transactions.length > 0 ? (
        <div className="transactions-grid">
          {transactions.slice(0, 6).map((txn) => (
            <div key={txn._id} className="transaction-card">
              <p className="dashboard-amount">
                <SiEthereum />
                {txn.amount} ETH
              </p>

              <div className="address-box">
                <p className="address-labels">
                  <span className="address-from-label">From</span>
                  <span className="address-to-label">To</span>
                </p>
                <p className="addresses">
                  {displayAddress(txn.walletAddress)} →{" "}
                  {displayAddress(txn.recipient)}
                </p>
              </div>
              <p className="date">{shortenDateFormat(txn.timestamp)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="error-message">No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionsDBCards;
