import React, { useState, useEffect } from "react";
import { shortenAddress, shortenDateFormat } from "../utils/shortenAddress";
import axios from "axios";

// Transactions pulled from database
const TransactionsDashboard = ({ loggedInUser }) => {
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
      <h2 style={{ color: "#fff", textAlign: "center", marginBottom: "20px" }}>
        Latest Database Transactions from User
      </h2>
      {transactions.length > 0 ? (
        <div className="transactions-grid">
          {transactions.slice(0, 6).map((txn) => (
            <div key={txn._id} className="transaction-card">
              <p className="from-address">
                From: {shortenAddress(txn.walletAddress)}
              </p>
              <p className="to-address">To: {shortenAddress(txn.recipient)}</p>
              <p className="amount">Amount: {txn.amount}</p>
              <p className="date">Date: {shortenDateFormat(txn.timestamp)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: "#fff", textAlign: "center" }}>
          No transactions found.
        </p>
      )}
    </div>
  );
};

export default TransactionsDashboard;
