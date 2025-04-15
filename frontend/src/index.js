import React from "react";
import App from "./App";
import { TransactionProvider } from "./context/TransactionContext";
import { Web3ReactProvider, initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Web3Provider } from '@ethersproject/providers';
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";

//Initialize Metamask connector
const [metaMask, hooks] = initializeConnector(
  (actions) => new MetaMask({ actions })
);

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;

  return library;
}


const container = document.getElementById("root");
const root = createRoot(container);

// index.js ~ main.js ~ main.jsx
root.render(
    <React.StrictMode>
      <Web3ReactProvider 
      connectors={[[metaMask, hooks]]}
      getLibrary={getLibrary}>
        <Provider store={store}>
          <TransactionProvider>
            <App />
          </TransactionProvider>
        </Provider> 
      </Web3ReactProvider>
    </React.StrictMode>
);
