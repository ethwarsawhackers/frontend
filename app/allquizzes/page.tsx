import React from 'react';
import { contracts } from '../data';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const AllContractsPage = dynamic(() => Promise.resolve(() => {
  return (
    <div className="container">
      <h1>All Contracts</h1>
      <div className="contract-list">
        {contracts.map((contract, index) => (
          <div key={index} className="contract-item">
            <div className="contract-buttons">
              <Link href={`/quiz/${encodeURIComponent(contract.metadata.title)}`}>
                <button>{contract.metadata.title}</button>
              </Link>
              <Link href={`/quiz/${encodeURIComponent(contract.metadata.title)}/export`}>
                <button>Export Answers</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}), { 
  ssr: false 
});

export default AllContractsPage;
