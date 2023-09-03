"use client";
import React, { useState, useEffect } from "react";
import { fetchContractData } from "../helpers/fetchContractData";
import Link from "next/link";
import dynamic from "next/dynamic";

const AllContractsPage = dynamic(
  () =>
    Promise.resolve(() => {
      const [contracts, setContracts] = useState([]);
      useEffect(() => {
        if (!window.walletAddress) {
          window.walletAddress = "gzhTmIZrTDeWJWqLik_VPPkB7lglmUKaItJGTRzmLrg";
        }
        fetch(
          `https://dre-2.warp.cc/contract?id=wk4ZWf6v5CY5o5-pjfkO7b1ezIkkGMXIAfJjchPf3bY&query=$.trivias.${window?.walletAddress}`
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
                "Fetched contracts for " + window.walletAddress + ", ",
                fetchedContracts
              );

              fetchedContracts = fetchedContracts.filter((c) => c?.metadata);
              setContracts(fetchedContracts);
            });
          });
      }, []);
      return (
        <div className="container all-contracts-page">
          <h1>All Contracts</h1>
          <div className="contract-list">
            {contracts.map((contract, index) => (
              <div key={index} className="contract-item">
                <div className="contract-buttons">
                  <Link href={`/quiz/${encodeURIComponent(contract.id)}`}>
                    <button>{contract.metadata.title}</button>
                  </Link>
                  <Link
                    href={`/quiz/${encodeURIComponent(contract.id)}/export`}
                  >
                    <button>Export Answers</button>
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
