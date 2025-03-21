export const shortenAddress = (address) =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

export const shortenBalance = (balance) => `${balance.slice(0, 6)}`;

export const shortenDateFormat = (timestamp) => {
  const date = new Date(timestamp);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short", // "Tue"
    month: "short", // Mar
    day: "numeric", // "11"
    year: "numeric", // "2025"
  }).format(date); // "TUE, MAR 11 2025"

  return formattedDate;
};
