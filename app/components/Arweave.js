import { ArweaveWebWallet } from "arweave-wallet-connector";

const wallet = new ArweaveWebWallet({
  // Initialize the wallet as soon as possible to get instant auto reconnect
  name: "Connector Example",
  logo: "https://jfbeats.github.io/ArweaveWalletConnector/placeholder.svg",
});

wallet.setUrl("https://arweave.app");
// console.log(wallet);
// await wallet.connect(); // on user gesture to avoid blocked popup

export default wallet;
