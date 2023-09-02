export interface Metadata {
  title: string;
  tokens: string;
  ticker: string;
  chain: string;
  allow: string[];
  maxEntries: string;
  note: string;
  style?: {
    background: string;
    text: string;
  };
}

export interface QuestionAnswer {
  caption: string;
}

export interface EntryQuestion {
  id: string;
  answers: string[];
}

export interface Entry {
  author: string;
  questions: EntryQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  note: string;
  answers: QuestionAnswer[];
}

export interface QuizContract {
  metadata: Metadata;
  entries: Entry[];
  questions: QuizQuestion[];
}


export const contracts: QuizContract[] = [{
  "metadata": {
    "title": "Web3 Developer Learning Trivia Quiz",
    "tokens": "100000",
    "ticker": "ETH",
    "chain": "ETH",
    "allow": ["0xe2445a61dE107fc53dbB741f099EFC7bB6cdF49b"],
    "maxEntries": '50',
    "note": "V2VsY29tZSB0byB0aGUgV2ViMyBEZXZlbG9wZXIgTGVhcm5pbmcgVHJpdmlhIFF1aXohIFRoaXMgcXVpeiBhaW1zIHRvIHRlc3QgeW91ciBrbm93bGVkZ2Ugd2hpbGUgcHJvdmlkaW5nIGVkdWNhdGlvbmFsIGluc2lnaHRzIGludG8gdGhlIHdvcmxkIG9mIGJsb2NrY2hhaW4gYW5kIFdlYjMuIExldCdzIGdldCBzdGFydGVkIQ==",
    "style": {
        "background": "color: #04040",
        "text": "color: #f4f4f4"
    }
  },
  "entries": [
    {
        "author": "0xe2445a61dE107fc53dbB741f099EFC7bB6cdF49b",
        "questions": [
            { 
                "id": "550e8400-e29b-41d4-a716-446655440000",
                "answers": ["1"]
            },
            { 
                "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
                "answers": ["3"]
            }
        ]
    }
  ],
  "questions": [
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "question": "What does a blockchain primarily serve as?",
    "note": "QSBibG9ja2NoYWluIGlzIGEgcHVibGljIGxlZGdlciB0aGF0IHJlY29yZHMgdHJhbnNhY3Rpb25zIGFjcm9zcyBtYW55IGNvbXB1dGVycy4gSXQncyByZXNpc3RhbnQgdG8gbW9kaWZpY2F0aW9uLCBlbmhhbmNpbmcgdHJhbnNwYXJlbmN5IGFuZCBzZWN1cml0eS4=",
    "answers": [
      {"caption": "A public ledger"},
      {"caption": "A private database"},
      {"caption": "A chat application"},
      {"caption": "A video streaming service"}
    ]
  },
  {
    "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "question": "Which language is primarily used to write Ethereum smart contracts?",
    "note": "U29saWRpdHkgaXMgdGhlIG1haW4gcHJvZ3JhbW1pbmcgbGFuZ3VhZ2UgZm9yIGRldmVsb3Bpbmcgc21hcnQgY29udHJhY3RzIG9uIHRoZSBFdGhlcmV1bSBibG9ja2NoYWluLiBJdCB3YXMgZGVzaWduZWQgZm9yIGNyZWF0aW5nIGNvbXBsZXggY29udHJhY3RzIGFuZCBkQXBwcy4=",
    "answers": [
      {"caption": "Python"},
      {"caption": "Ruby"},
      {"caption": "Solidity"},
      {"caption": "Swift"}
    ]
  },
  {
    "id": "6ba7b811-9dad-11d1-80b4-00c04fd430c9",
    "question": "What does 'gas' represent in the Ethereum ecosystem?",
    "note": "SW4gRXRoZXJldW0sICdnYXMnIHJlcHJlc2VudHMgdGhlIGNvbXB1dGF0aW9uYWwgd29yayByZXF1aXJlZCB0byBleGVjdXRlIG9wZXJhdGlvbnMuIFVzZXJzIHBheSBnYXMgZmVlcyBpbiBFdGhlciB0byBpbmNlbnRpdmUgbWluZXJzIHRvIGluY2x1ZGUgdGhlaXIgdHJhbnNhY3Rpb25zIGluIGEgYmxvY2su",
    "answers": [
      {"caption": "Energy"},
      {"caption": "Code complexity"},
      {"caption": "Transaction fees"},
      {"caption": "Internet speed"}
    ]
  },
  {
    "id": "6ba7b812-9dad-11d1-80b4-00c04fd430c7",
    "question": "What is a DAO?",
    "note": "REFPcyBhcmUgb3JnYW5pemF0aW9ucyByZXByZXNlbnRlZCBieSBzbWFydCBjb250cmFjdHMgb24gdGhlIGJsb2NrY2hhaW4sIHdoaWNoIGFyZSBjb250cm9sbGVkIGJ5IHdyaXR0ZW4gY29kZSBhbmQgY29uc2Vuc3VhbCBhZ3JlZW1lbnRzLCByYXRoZXIgdGhhbiBhIGNlbnRyYWxpemVkIGF1dGhvcml0eS4=",
    "answers": [
      {"caption": "Data Analysis Organization"},
      {"caption": "Decentralized Autonomous Organization"},
      {"caption": "Digital Asset Optimization"},
      {"caption": "Dynamic Address Operation"}
    ]
  },
  {
    "id": "6ba7b813-9dad-11d1-80b4-00c04fd430c6",
    "question": "What is the function of Oracles in blockchain?",
    "note": "T3JhY2xlcyBhcmUgdGhpcmQtcGFydHkgc2VydmljZXMgdGhhdCBmZWVkIHNtYXJ0IGNvbnRyYWN0cyB3aXRoIGV4dGVybmFsIGluZm9ybWF0aW9uLCBlbmFibGluZyB0aGVtIHRvIGV4ZWN1dGUgYmFzZWQgb24gZGF0YSBsaWtlIHByaWNlIGZlZWRzLCB3ZWF0aGVyIGNvbmRpdGlvbnMsIG9yIG90aGVyIHJlYWwtd29ybGQgZXZlbnRzLg==",
    "answers": [
      {"caption": "Predicting the future"},
      {"caption": "Providing external data to smart contracts"},
      {"caption": "Fixing bugs in the code"},
      {"caption": "Optimizing gas costs"}
    ]
  }]},
  {
    "metadata": {
      "title": "Web3 Developer Learning Trivia Quiz 2",
      "tokens": "100000",
      "ticker": "ETH",
      "chain": "ETH",
      "allow": ["0xe2445a61dE107fc53dbB741f099EFC7bB6cdF49b"],
      "maxEntries": '50',
      "note": "V2VsY29tZSB0byB0aGUgV2ViMyBEZXZlbG9wZXIgTGVhcm5pbmcgVHJpdmlhIFF1aXohIFRoaXMgcXVpeiBhaW1zIHRvIHRlc3QgeW91ciBrbm93bGVkZ2Ugd2hpbGUgcHJvdmlkaW5nIGVkdWNhdGlvbmFsIGluc2lnaHRzIGludG8gdGhlIHdvcmxkIG9mIGJsb2NrY2hhaW4gYW5kIFdlYjMuIExldCdzIGdldCBzdGFydGVkIQ==",
      "style": {
          "background": "color: #04040",
          "text": "color: #f4f4f4"
      }
    },
    "entries": [
      {
          "author": "0xe2445a61dE107fc53dbB741f099EFC7bB6cdF49b",
          "questions": [
              { 
                  "id": "550e8400-e29b-41d4-a716-446655440000",
                  "answers": ["1"]
              },
              { 
                  "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
                  "answers": ["3"]
              }
          ]
      }
    ],
    "questions": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "question": "What does a blockchain primarily serve as?",
      "note": "QSBibG9ja2NoYWluIGlzIGEgcHVibGljIGxlZGdlciB0aGF0IHJlY29yZHMgdHJhbnNhY3Rpb25zIGFjcm9zcyBtYW55IGNvbXB1dGVycy4gSXQncyByZXNpc3RhbnQgdG8gbW9kaWZpY2F0aW9uLCBlbmhhbmNpbmcgdHJhbnNwYXJlbmN5IGFuZCBzZWN1cml0eS4=",
      "answers": [
        {"caption": "A public ledger"},
        {"caption": "A private database"},
        {"caption": "A chat application"},
        {"caption": "A video streaming service"}
      ]
    },
    {
      "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      "question": "Which language is primarily used to write Ethereum smart contracts?",
      "note": "U29saWRpdHkgaXMgdGhlIG1haW4gcHJvZ3JhbW1pbmcgbGFuZ3VhZ2UgZm9yIGRldmVsb3Bpbmcgc21hcnQgY29udHJhY3RzIG9uIHRoZSBFdGhlcmV1bSBibG9ja2NoYWluLiBJdCB3YXMgZGVzaWduZWQgZm9yIGNyZWF0aW5nIGNvbXBsZXggY29udHJhY3RzIGFuZCBkQXBwcy4=",
      "answers": [
        {"caption": "Python"},
        {"caption": "Ruby"},
        {"caption": "Solidity"},
        {"caption": "Swift"}
      ]
    },
    {
      "id": "6ba7b811-9dad-11d1-80b4-00c04fd430c9",
      "question": "What does 'gas' represent in the Ethereum ecosystem?",
      "note": "SW4gRXRoZXJldW0sICdnYXMnIHJlcHJlc2VudHMgdGhlIGNvbXB1dGF0aW9uYWwgd29yayByZXF1aXJlZCB0byBleGVjdXRlIG9wZXJhdGlvbnMuIFVzZXJzIHBheSBnYXMgZmVlcyBpbiBFdGhlciB0byBpbmNlbnRpdmUgbWluZXJzIHRvIGluY2x1ZGUgdGhlaXIgdHJhbnNhY3Rpb25zIGluIGEgYmxvY2su",
      "answers": [
        {"caption": "Energy"},
        {"caption": "Code complexity"},
        {"caption": "Transaction fees"},
        {"caption": "Internet speed"}
      ]
    },
    {
      "id": "6ba7b812-9dad-11d1-80b4-00c04fd430c7",
      "question": "What is a DAO?",
      "note": "REFPcyBhcmUgb3JnYW5pemF0aW9ucyByZXByZXNlbnRlZCBieSBzbWFydCBjb250cmFjdHMgb24gdGhlIGJsb2NrY2hhaW4sIHdoaWNoIGFyZSBjb250cm9sbGVkIGJ5IHdyaXR0ZW4gY29kZSBhbmQgY29uc2Vuc3VhbCBhZ3JlZW1lbnRzLCByYXRoZXIgdGhhbiBhIGNlbnRyYWxpemVkIGF1dGhvcml0eS4=",
      "answers": [
        {"caption": "Data Analysis Organization"},
        {"caption": "Decentralized Autonomous Organization"},
        {"caption": "Digital Asset Optimization"},
        {"caption": "Dynamic Address Operation"}
      ]
    },
    {
      "id": "6ba7b813-9dad-11d1-80b4-00c04fd430c6",
      "question": "What is the function of Oracles in blockchain?",
      "note": "T3JhY2xlcyBhcmUgdGhpcmQtcGFydHkgc2VydmljZXMgdGhhdCBmZWVkIHNtYXJ0IGNvbnRyYWN0cyB3aXRoIGV4dGVybmFsIGluZm9ybWF0aW9uLCBlbmFibGluZyB0aGVtIHRvIGV4ZWN1dGUgYmFzZWQgb24gZGF0YSBsaWtlIHByaWNlIGZlZWRzLCB3ZWF0aGVyIGNvbmRpdGlvbnMsIG9yIG90aGVyIHJlYWwtd29ybGQgZXZlbnRzLg==",
      "answers": [
        {"caption": "Predicting the future"},
        {"caption": "Providing external data to smart contracts"},
        {"caption": "Fixing bugs in the code"},
        {"caption": "Optimizing gas costs"}
      ]
    }
  ]}
]
