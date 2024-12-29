import React from "react";
import App from "./App";
import { TransactionProvider } from "./context/TransactionContext";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

// index.js ~ main.js ~ main.jsx
root.render(
  <TransactionProvider> 
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider> 
    </React.StrictMode>
  </TransactionProvider>
);
