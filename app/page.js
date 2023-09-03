"use client";
import { useState } from "react";
import Link from "next/link";
import { Alert, Snackbar } from "@mui/material";
import wallet from "./components/Arweave";
export default function Home() {
  const [open, setOpen] = useState(false);
  const [hasArweave, setHasArweave] = useState(false);
  const [hasAleph, setHasAleph] = useState(false);

  async function connectArweave() {
    await wallet.connect();
    if (wallet.address) {
      console.log("Wallet Address: " + wallet.address);
      setHasArweave(true);
      setOpen(true);
      window.arWallet=wallet
    }
  }

  async function disconnectArweave() {
    await wallet.disconnect();
    if (!wallet.address) {
      console.log("Wallet Disconnected");
      setHasArweave(false);
    }
  }

  async function connectAleph() {
    console.log("Connecting to Aleph");
    const { web3Enable, web3Accounts, web3FromSource } = await import(
      "@polkadot/extension-dapp"
    );
    // returns an array of all the injected sources
    // (this needs to be called first, before other requests)
    const allInjected = await web3Enable("my cool dapp");
    console.log(allInjected);

    // returns an array of { address, meta: { name, source } }
    // meta.source contains the name of the extension that provides this account
    const allAccounts = await web3Accounts();
    console.log(allAccounts);

    if (allAccounts.length === 0) {
      console.log("No accounts found");
      return;
    }

    console.log(`Chosen account: ${allAccounts[0].address}`);
    window.alephWallet = allAccounts[0];
    setHasAleph(true);
    setOpen(true);

    // the address we use to use for signing, as injected
    // const SENDER = '5DTestUPts3kjeXSTMyerHihn1uwMfLj8vU8sqF7qYrFabHE';

    // finds an injector for an address
    // const injector = await web3FromAddress(SENDER);

    // sign and send our transaction - notice here that the address of the account
    // (as retrieved injected) is passed through as the param to the `signAndSend`,
    // the API then calls the extension to present to the user and get it signed.
    // Once complete, the api sends the tx + signature via the normal process
    // api.tx.balances
    //   .transfer('5C5555yEXUcmEJ5kkcCMvdZjUo7NGJiQJMS7vZXEeoMhj3VQ', 123456)
    //   .signAndSend(SENDER, { signer: injector.signer }, (status) => { ... });
  }

  async function disconnectAleph() {
    console.log("Wallet Disconnected");
    setHasAleph(false);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <main>
      <div className="container home-page">
        <h1>Magnetify</h1>
        <sub className="tagline">
          <i>Amplify Your Knowledge. Magnetize Your Future</i>
        </sub>

        {hasAleph || hasArweave ? (
          <div className="functions-list">
            <Link
              href={{
                pathname: "/create",
                query: wallet, // the data
              }}
              className="function-link"
            >
              <button className="btn-secondary btn-home">Create Quiz</button>
            </Link>
            <Link href="/allquizzes" className="function-link">
              <button className="btn-secondary btn-home">
                View all Quizzes
              </button>
            </Link>
            {hasArweave ? (
              <button
                className="btn-cancel btn-home"
                onClick={disconnectArweave}
              >
                Disconnect Arweave
              </button>
            ) : hasAleph ? (
              <button className="btn-cancel btn-home" onClick={disconnectAleph}>
                Disconnect Aleph
              </button>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="connect-header"> Connect Wallet</h2>
            <div className="wallets-list">
              <button
                className="btn-secondary btn-connect"
                onClick={connectArweave}
              >
                Arweave
              </button>
              <button
                className="btn-secondary btn-connect"
                onClick={connectAleph}
              >
                Aleph
              </button>
            </div>
          </div>
        )}

        {/* Alert success if hasAleph or hasArweave */}
        {hasAleph || hasArweave ? (
          <Snackbar open={open} autoHideDuration={3000}>
            <Alert
              severity="success"
              className="alert-success-msg"
              onClose={handleClose}
            >
              <strong>Connected!</strong> You are now connected to{" "}
              {hasAleph ? "Aleph" : "Arweave"}
            </Alert>
          </Snackbar>
        ) : (
          () => {}
        )}
      </div>
    </main>
  );
}
