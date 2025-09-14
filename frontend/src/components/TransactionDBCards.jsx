import React, { useState, useEffect } from "react";
import { shortenAddress, shortenDateFormat } from "../utils/shortenAddress";
import axios from "axios";
import { SiEthereum } from "react-icons/si";

// [Dashboard] Transactions pulled from database
const TransactionsDBCards = ({ loggedInUser }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [userMap, setUserMap] = useState({}); // Store address-to-username mapping

  useEffect(() => {
    // Fetch transactions for the logged-in user's walletAddress
    if (loggedInUser?.walletAddress) {
      axios
        .get(`/api/transactions`, {
          params: { walletAddress: loggedInUser.walletAddress.toLowerCase() },
        })
        .then((response) => {
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
            axios
              .post(`/api/users/usernames`, { 
                addresses: Array.from(allAddresses) 
              })
              .then((userResponse) => {
                setUserMap(userResponse.data);
              })
              .catch((err) => {
                console.error("Error fetching usernames:", err);
              });
          }
        })
        .catch((err) => {
          console.error(err);
          setError("Error fetching transactions");
        });
    } else {
      setError("No wallet address found for logged-in user.");
    }
  }, [loggedInUser]);

  // Function to display address or username
  const displayAddress = (address) => {
    const normalizedAddress = address.toLowerCase();
    //const normalizedAddress = address;
    return userMap[normalizedAddress] || shortenAddress(address);
  };

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
                  {displayAddress(txn.recipient)} →{" "}
                  {displayAddress(txn.walletAddress)}
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
