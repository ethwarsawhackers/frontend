"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { BlueprintPromise } from "@polkadot/api-contract";
import { ApiPromise, WsProvider } from "@polkadot/api";
import Arweave from "arweave/web";
import Link from "next/link";
import { contracts, QuizContract, QuizQuestion, Metadata } from "../data";
import Confetti from "react-confetti";
import { v4 as uuidv4 } from "uuid";
import TextField from "@mui/material/TextField";
import dynamic from "next/dynamic";
import {
  DeployPlugin,
  InjectedArweaveSigner,
} from "warp-contracts-plugin-deploy";
import { WarpFactory } from "warp-contracts";
import { Keyring } from "@polkadot/keyring";

import daQuizMeta from "../daQuiz.json";

const CreateQuizPage = dynamic(
  () =>
    Promise.resolve(() => {
      const warp = WarpFactory.forMainnet().use(new DeployPlugin());

      const emptyEntry = [
        {
          author: "",
          questions: [],
        },
      ];

      const emptyMetadata = {
        title: "",
        tokens: "",
        ticker: "",
        chain: "",
        allow: [""],
        maxEntries: "",
        note: "",
        style: undefined,
      };

      const emptyQuestions = [
        {
          id: uuidv4(),
          question: "",
          answers: [{ caption: "" }],
          note: "",
        },
      ];

      const [questions, setQuestions] =
        useState<QuizQuestion[]>(emptyQuestions);
      const [metadata, setMetadata] = useState<Metadata>(emptyMetadata);
      const [isSubmitted, setIsSubmitted] = useState(false);
      const [showConfetti, setShowConfetti] = useState(false);
      const [connectedWallet, setConnectedWallet] = useState<string[]>([]);
      const [selectedDeploymentOptions, setSelectedDeploymentOptions] =
        useState<string[]>([]);

      async function initApi() {
        // Replace 'wss://your-node-url' with the WebSocket URL of your Polkadot node
        const provider = new WsProvider(
          "wss://aleph-zero-testnet-rpc.dwellir.com"
        );
        const api = await ApiPromise.create({ provider });

        return api;
      }

      // Check if the user is connected to the Polkadot.js wallet
      async function isConnectedToPolkadotJsWallet() {
        try {
          const api = await initApi();

          // Check if the API is connected
          if (!api.isConnected) {
            return false;
          }

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
            return false;
          }

          // You can also log the available accounts if needed
          console.log("Available accounts:", allAccounts);

          // If there are accounts available, the user is connected to Polkadot.js wallet
          return true;
        } catch (error) {
          console.error("Error checking Polkadot.js wallet connection:", error);
          return false;
        }
      }

      // Initialize the Arweave instance
      const arweave = Arweave.init({
        // Replace 'your-arweave-node-url' with the URL of your Arweave node
        host: "arweave.net",
        port: 443, // Default Arweave port
        protocol: "https", // Use HTTPS
        timeout: 20000, // Optional timeout in milliseconds (adjust as needed)
      });

      // Check if the user is connected to the Arweave wallet
      async function isConnectedToArweaveWallet() {
        return typeof (window as any)?.arWallet != "undefined";
      }

      useEffect(() => {
        async function checkWalletConnection() {
          if (await isConnectedToPolkadotJsWallet()) {
            // User is connected to Polkadot.js wallet, add 'polkadotjs' to connectedWallet
            setConnectedWallet((prevConnectedWallets) => [
              ...prevConnectedWallets,
              "polkadotjs",
            ]);
          }
          if (await isConnectedToArweaveWallet()) {
            // User is connected to Arweave wallet, add 'arweave' to connectedWallet
            setConnectedWallet((prevConnectedWallets) => [
              ...prevConnectedWallets,
              "arweave",
            ]);
          }
        }

        checkWalletConnection();
      }, []);

      const handleDeploymentOptionChange = (
        event: ChangeEvent<HTMLInputElement>
      ) => {
        const option = event.target.value;
        console.log(option);
        console.log(selectedDeploymentOptions);
        setSelectedDeploymentOptions(option);
        console.log(selectedDeploymentOptions);
      };

      const addQuestion = () => {
        setQuestions((prevQuestions) => [
          ...prevQuestions,
          {
            id: uuidv4(),
            question: "",
            answers: [{ caption: "" }], // Initialize with one answer option
            note: "",
          },
        ]);
        console.log(uuidv4);
      };

      const addAnswerOption = (index: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].answers.push({ caption: "" });
        setQuestions(updatedQuestions);
      };

      const removeAnswerOption = (index: number, answerIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].answers.splice(answerIndex, 1);
        setQuestions(updatedQuestions);
      };

      const handleQuestionChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
      ) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = event.target.value;
        setQuestions(updatedQuestions);
      };

      const handleAnswerChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
        answerIndex: number
      ) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].answers[answerIndex] = {
          caption: event.target.value,
        };
        setQuestions(updatedQuestions);
      };

      const handleNoteChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
      ) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].note = event.target.value;
        setQuestions(updatedQuestions);
      };

      const removeQuestion = (index: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
      };

      const resetForm = () => {
        setMetadata(emptyMetadata);
        setQuestions(emptyQuestions);
        setIsSubmitted(true);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const { arweaveWallet } = window as any;
        const { alephWallet } = window as any;
        const { web3FromAddress } = await import("@polkadot/extension-dapp");
        if (!arweaveWallet && !alephWallet) {
          alert("Please login with a wallet to continue!");
          return; // Prevent further processing if wallet is not installed
        }

        // Check if any of the required fields in the metadata are empty
        if (
          !metadata?.title ||
          !metadata?.tokens ||
          !metadata?.ticker ||
          !metadata?.chain ||
          !metadata?.maxEntries ||
          !metadata?.note
        ) {
          alert("Please fill in all fields before submitting.");
          return; // Prevent further processing if validation fails
        }

        // Check if any of the questions or answers are empty
        if (
          questions.some(
            (q) => !q.question || q.answers.some((a) => !a.caption)
          )
        ) {
          alert("Please fill in all questions and answers.");
          return; // Prevent further processing if validation fails
        }

        // Convert notes to base64 encoding
        const questionsWithBase64Notes = questions.map((q) => ({
          ...q,
          note: btoa(q.note), // Convert the note to base64
        }));

        metadata.note = btoa(metadata.note);

        let newContract: QuizContract = {
          metadata: metadata,
          entries: emptyEntry,
          questions: questionsWithBase64Notes,
        };

        // contracts.push(newContract);

        // console.log("Updated Contracts:", contracts);

        if (alephWallet) {
          console.log("Aleph Wallet detected", alephWallet);
          // Construct
          // const wsProvider = new WsProvider("wss://aleph-zero-testnet-rpc.dwellir.com");
          const wsProvider = new WsProvider("wss://ws.test.azero.dev");
          const api = await ApiPromise.create({ provider: wsProvider });
          // the address we use to use for signing, as injected
          const SENDER = alephWallet.address;

          // Initialize the keyring
          const keyring = new Keyring({ type: "sr25519" });
          const caller = await web3FromAddress(SENDER);
          api.setSigner(caller.signer);

          const blueprint = new BlueprintPromise(
            api,
            daQuizMeta,
            "0xab90296deb54ef262b070ef27ab756eb88bd05773d75420daea255a9c35583f9"
          );

          const gasLimit = 1e11;
          // a limit to how much Balance to be used to pay for the storage created by the instantiation
          // if null is passed, unlimited balance can be used
          const storageDepositLimit = null;
          // used to derive contract address,
          // use null to prevent duplicate contracts
          const salt = Uint8Array.from(uuidv4(), (x) => x.charCodeAt(0));

          const endowment = 1_000_000_000_000;
          const constructorIndex = 0; // Index of the constructor to use
          const constructorArgs = [newContract.metadata, newContract.questions];

          const tx = blueprint.tx.default({
            gasLimit,
            storageDepositLimit,
            salt,
            ...constructorArgs,
          });

          // const bprint = await blueprint.tx.new(endowment, gasLimit, constructorIndex, ...constructorArgs).signAndSend(alephWallet.address)

          let address;

          const unsub = await tx.signAndSend(alephWallet.address, (data) => {
            if (data.isInBlock || data.isFinalized) {
              console.log(data);
              address = Buffer.from(data.txHash.buffer).toString();
              unsub();
            }
          });

          console.log(`New contract address ${address}`);
        } else {
          // * Arweave
          console.log(
            `Creating form with address ${arweaveWallet.getActiveAddress()}`
          );
          const userSigner = new InjectedArweaveSigner(
            (window as any).arWallet
          );
          await userSigner.setPublicKey();
          const registryContract = warp
            .contract("wk4ZWf6v5CY5o5-pjfkO7b1ezIkkGMXIAfJjchPf3bY")
            .connect(userSigner);
          const { contractTxId } = await warp.deployFromSourceTx({
            wallet: userSigner,
            initState: JSON.stringify({
              metadata: {
                title: metadata.title,
                tokens: metadata.tokens,
                ticker: metadata.ticker,
                chain: metadata.chain,
                allow: metadata.allow,
                maxEntries: metadata.maxEntries,
                note: btoa(metadata.note),
                style: {
                  background: "color: #04040",
                  text: "color: #f4f4f4",
                },
              },
              entries: [],
              questions: questions,
            }),
            srcTxId: "bjzoOHRcCwikYuiPVwqIKMX6tOqK1kYImqA1ESHN1Ew",
          });
          await registryContract.writeInteraction({
            function: "addTrivia",
            address: (window as any).arweaveWallet.getActiveAddress(),
            id: "arweave:" + contractTxId,
          });
        }

        resetForm();

        // Show confetti upon successful submission
        setShowConfetti(true);

        // Hide confetti after a few seconds (adjust as needed)
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);

        console.log(selectedDeploymentOptions);
      };

      const renderConfetti = () => {
        if (showConfetti) {
          return <Confetti />;
        }
        return null;
      };

      const renderForm = () => {
        return (
          <div className="container">
            <h1>Create Quiz</h1>

            <h2 className="quiz-details-header">Details</h2>
            <div className="quiz-metadata">
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                onChange={(event) =>
                  setMetadata({ ...metadata, title: event.target.value })
                }
                value={metadata?.title}
                className="text-input"
                style={{ marginTop: "1rem" }}
              />
              <TextField
                id="outlined-basic"
                label="No. of tokens"
                type="number"
                variant="outlined"
                onChange={(event) =>
                  setMetadata({ ...metadata, tokens: event.target.value })
                }
                value={metadata?.tokens}
                className="text-input"
                style={{ marginTop: "1rem" }}
              />
              <TextField
                id="outlined-basic"
                label="Ticker"
                variant="outlined"
                onChange={(event) =>
                  setMetadata({ ...metadata, ticker: event.target.value })
                }
                value={metadata?.ticker}
                className="text-input"
                style={{ marginTop: "1rem" }}
              />
              <TextField
                id="outlined-basic"
                label="Chain"
                variant="outlined"
                onChange={(event) =>
                  setMetadata({ ...metadata, chain: event.target.value })
                }
                value={metadata?.chain}
                className="text-input"
                style={{ marginTop: "1rem" }}
              />
              <TextField
                id="outlined-basic"
                label="Allowed participants"
                variant="outlined"
                onChange={(event) =>
                  setMetadata({
                    ...metadata,
                    allow: event.target.value.split(","),
                  })
                }
                value={metadata?.allow}
                className="text-input"
                style={{ marginTop: "1rem" }}
              />
              <TextField
                id="outlined-basic"
                label="Max no. of entries"
                type="number"
                variant="outlined"
                onChange={(event) =>
                  setMetadata({ ...metadata, maxEntries: event.target.value })
                }
                value={metadata?.maxEntries}
                className="text-input"
                style={{ marginTop: "1rem" }}
              />
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                onChange={(event) =>
                  setMetadata({ ...metadata, note: event.target.value })
                }
                value={metadata?.note}
                className="text-input"
                style={{ marginTop: "1rem" }}
              />
            </div>

            <div className="questions-section">
              {questions.map((question, index) => (
                <div key={index} className="question-form">
                  <h2 className="qn-header">Question {index + 1}</h2>
                  <TextField
                    id="outlined-basic"
                    label="Enter your question"
                    variant="outlined"
                    onChange={(event) => handleQuestionChange(event, index)}
                    value={question.question}
                    className="text-input question-input"
                    style={{ marginTop: "1rem" }}
                  />
                  <ul className="options-list">
                    {question.answers.map((answer, answerIndex) => (
                      <li key={answerIndex} className="option-form">
                        <TextField
                          id="outlined-basic"
                          label={`Enter option ${answerIndex + 1}`}
                          variant="outlined"
                          onChange={(event) =>
                            handleAnswerChange(event, index, answerIndex)
                          }
                          value={answer.caption}
                          className="text-input"
                          style={{ marginTop: "1rem" }}
                        />
                        {question.answers.length > 1 && (
                          <button
                            onClick={() =>
                              removeAnswerOption(index, answerIndex)
                            }
                            className="btn-cancel remove-option-btn"
                          >
                            Remove Option
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => addAnswerOption(index)}
                    className="btn-secondary add-option-btn"
                  >
                    Add Option
                  </button>
                  <TextField
                    id="outlined-basic"
                    label="Question note"
                    variant="outlined"
                    onChange={(event) => handleNoteChange(event, index)}
                    value={question.note}
                    className="text-input"
                    style={{ marginTop: "1rem" }}
                  />
                  <button
                    onClick={() => removeQuestion(index)}
                    className="btn-cancel remove-qn-btn"
                  >
                    Remove Question
                  </button>
                </div>
              ))}
              <button
                onClick={addQuestion}
                className="btn-secondary add-qn-btn"
              >
                Add Question
              </button>
              <div style={{ margin: "16px" }}>
                <h2>Choose Deployment Option:</h2>
                <div style={{ margin: "16px" }}>
                  <label style={{ marginBottom: "8px", display: "block" }}>
                    <input
                      type="radio"
                      name="deploymentOption"
                      value="arweave"
                      checked={selectedDeploymentOptions === "arweave"}
                      onChange={handleDeploymentOptionChange}
                      hidden={!connectedWallet.includes("arweave")} // Disable if Arweave wallet is not connected
                    />
                    {connectedWallet.includes("arweave")
                      ? "Deploy on Arweave"
                      : "Not connected to Arweave wallet"}
                  </label>
                  <label style={{ marginBottom: "8px", display: "block" }}>
                    <input
                      type="radio"
                      name="deploymentOption"
                      value="polkadotjs"
                      checked={selectedDeploymentOptions === "polkadotjs"}
                      onChange={handleDeploymentOptionChange}
                      hidden={!connectedWallet.includes("polkadotjs")} // Disable if Polkadot.js wallet is not connected
                    />
                    {connectedWallet.includes("polkadotjs")
                      ? "Deploy on AlephZero"
                      : "Not connected to Polkadot.js wallet"}
                  </label>
                </div>
              </div>
              <div>
                <button
                  onClick={handleSubmit}
                  className="btn-primary submit-quiz-btn"
                >
                  Submit Quiz
                </button>
              </div>
            </div>
          </div>
        );
      };

      const renderSuccessMessage = () => {
        return (
          <div>
            {renderConfetti()}
            <h1>Quiz Created!</h1>
            <button onClick={() => setIsSubmitted(false)}>
              Create Another Quiz
            </button>
            <Link href="/allquizzes">
              <button className="button">View All quizzes</button>
            </Link>
          </div>
        );
      };

      return (
        <div className="container">
          {isSubmitted ? renderSuccessMessage() : renderForm()}
        </div>
      );
    }),
  {
    ssr: false,
  }
);

export default CreateQuizPage;
