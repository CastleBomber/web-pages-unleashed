import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionsDashboard = ({ loggedInUser }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch transactions for the logged-in user's walletAddress
    if (loggedInUser?.walletAddress) {
      axios
        .get(`/api/transactions`, {
          params: { walletAddress: loggedInUser.walletAddress },
        })
        .then((response) => {
          setTransactions(response.data);
        })
        .catch((err) => {
          console.error(err);
          setError("Error fetching transactions");
        });
    } else {
      setError("No wallet address found for logged-in user.");
    }
  }, [loggedInUser]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Wallet Transactions</h2>
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((txn) => (
            <li key={txn._id}>
              <p>Recipient: {txn.recipient}</p>
              <p>Amount: {txn.amount}</p>
              <p>Status: {txn.status}</p>
              <p>Transaction Hash: {txn.transactionHash}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionsDashboard;
