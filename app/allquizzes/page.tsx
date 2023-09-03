"use client";
import React, { useState, useEffect } from "react";
import { fetchContractData } from "../helpers/fetchContractData";
import Link from "next/link";
import dynamic from "next/dynamic";

const shareQuizLink = (contractId) => {
  // Create the URL for sharing the quiz link
  const quizLink = `${window.location.origin}/quiz/${encodeURIComponent(contractId)}`;

  // Use the Web Share API to share the link
  if (navigator.share)
  {
    navigator.share({
      title: "Share Quiz Link",
      text: "Check out this quiz!",
      url: quizLink,
    })
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.error("Error sharing:", error));
  } else
  {
    // Fallback for browsers that do not support the Web Share API
    // You can implement custom sharing behavior here (e.g., copying to clipboard)
    alert(`Share this link for others to attempt this quiz: ${quizLink}`);
  }
};

const AllContractsPage = dynamic(
  () =>
    Promise.resolve(() => {
      const [contracts, setContracts] = useState([]);
      useEffect(() => {
        if (!(window as any).walletAddress)
        {
          (window as any).walletAddress = "gzhTmIZrTDeWJWqLik_VPPkB7lglmUKaItJGTRzmLrg";
        }
        fetch(
          `https://dre-2.warp.cc/contract?id=wk4ZWf6v5CY5o5-pjfkO7b1ezIkkGMXIAfJjchPf3bY&query=$.trivias.${(window as any)?.walletAddress}`
        )
          .then((res) => res.json())
          .then((r) => {
            let fetchedContractIds = r.result[0];
            Promise.all(
              fetchedContractIds.map(async (fcid) => {
                console.log(fcid);
                return await fetchContractData(fcid);
              })
            ).then((fetchedContracts) => {
              console.log(
                "Fetched contracts for " + (window as any).walletAddress + ", ",
                fetchedContracts
              );

              fetchedContracts = fetchedContracts.filter((c) => c?.metadata);
              setContracts(fetchedContracts);
            });
          });
      }, []);
      return (
        <div className="container all-contracts-page">
          <h1>All Quizzes</h1>
          <div className="contract-list">
            {contracts.map((contract, index) => (
              <div key={index} className="contract-item">
                <div className="contract-buttons">
                  <Link className="contract-button" href={`/quiz/${encodeURIComponent(contract.id)}`}>
                    <button>{contract.metadata.title}</button>
                  </Link>
                  <button className="contract-button" onClick={() => shareQuizLink(contract.id)}>Share Link</button>
                  <Link
                    href={`/quiz/${encodeURIComponent(contract.id)}/export`}
                    className="contract-button"
                  >
                    <button >Export Answers</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }),
  {
    ssr: false,
  }
);

export default AllContractsPage;
