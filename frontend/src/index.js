import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { TransactionProvider } from "./context/TransactionContext";

const container = document.getElementById("root");
const root = createRoot(container);

// index.js ~ main.js
root.render(
  <TransactionProvider>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider> 
    </React.StrictMode>
  </TransactionProvider>
);
