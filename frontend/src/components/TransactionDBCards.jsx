import React, { useState, useEffect } from "react";
import { shortenAddress, shortenDateFormat } from "../utils/shortenAddress";
import axios from "axios";
import { SiEthereum } from "react-icons/si";

// [Dashboard] Transactions pulled from database
const TransactionsDBCards = ({ loggedInUser }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

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
        })
        .catch((err) => {
          console.error(err);
          setError("Error fetching transactions");
        });
    } else {
      setError("No wallet address found for logged-in user.");
    }
  }, [loggedInUser]);

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div>
      <h2>Latest Database Transactions from User</h2>
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
                  {shortenAddress(txn.recipient)} →{" "}
                  {shortenAddress(txn.walletAddress)}
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
