export const shortenAddress = (address) =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

export const shortenBalance = (balance) => `${balance.slice(0, 6)}`;
