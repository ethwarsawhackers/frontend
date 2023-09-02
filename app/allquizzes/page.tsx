// Import necessary modules and data from 'data.ts'
import React from 'react';
import { contracts } from '../data';
import Link from 'next/link';

const AllContractsPage: React.FC = () => {
  return (
    <div className="container">
      <h1>All Contracts</h1>
      <div className="contract-list">
        {contracts.map((contract, index) => (
          <div key={index} className="contract-item">
            <Link href={`/quiz/${encodeURIComponent(contract.metadata.title)}`}>
              <button>{contract.metadata.title}</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllContractsPage;
