"use client";
import { useState } from "react";
import Link from "next/link";
import wallet from "./components/ArweaveButton";

export default function Home() {
  const [hasWallet, setHasWallet] = useState(false);

  async function handleConnect() {
    await wallet.connect();
    if (wallet.address) {
      console.log("Wallet Address: " + wallet.address);
      setHasWallet(true);
    }
  }

  async function handleDisconnect() {
    await wallet.disconnect();
    if (!wallet.address) {
      console.log("Wallet Disconnected");
      setHasWallet(false);
    }
  }

  return (
    <main>
      <div className="container home-page">
        <h1>Magnetify</h1>
        <sub>
          <i>Amplify Your Knowledge. Magnetize Your Future</i>
        </sub>

        {hasWallet ? (
          <div className="functions-list">
            <Link href="/create" className="function-link">
              <button className="btn-secondary btn-home">Create Quiz</button>
            </Link>
            <Link href="/allquizzes" className="function-link">
              <button className="btn-secondary btn-home">
                View all Quizzes
              </button>
            </Link>
            <button className="btn-cancel btn-home" onClick={handleDisconnect}>
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <button className="btn-primary btn-home" onClick={handleConnect}>
            Connect Wallet
          </button>
        )}
      </div>
    </main>
  );
}
