"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Confetti from "react-confetti";
import { contracts } from "../../data";
import dynamic from "next/dynamic";
import { WarpFactory } from "warp-contracts";
import {
  InjectedArweaveSigner,
} from "warp-contracts-plugin-deploy";
import { fetchContractData } from "../../helpers/fetchContractData";
import wallet from "../../components/Arweave";

const QuizPage = dynamic(
  () =>
    Promise.resolve(({ params }: { params: { title: string } }) => {
      const [activeQuestion, setActiveQuestion] = useState(0);
      const [questions, setQuestions] = useState([{ id:undefined, question: undefined, answers: undefined }]);
      const [title, setTitle] = useState('');
      const [checked, setChecked] = useState(false);
      const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
      const [showResult, setShowResult] = useState(false);
      const warp = WarpFactory.forMainnet()
      const [myEntry,setMyEntry]=useState([])
      const decodedTitle = decodeURIComponent(params.title);

      async function connectArweave() {
        console.log("Connecting to Arweave");
        await wallet.connect();
        if (wallet.address) {
          console.log("Wallet Address: " + wallet.address);
          window.arWallet = wallet;
          window.walletAddress = window.arweaveWallet.getActiveAddress();
        } else {
          console.log("Wallet Not Connected");
        }
      }

      async function disconnectArweave() {
        await wallet.disconnect();
        if (!wallet.address) {
          console.log("Wallet Disconnected");
        }
      }

      useEffect(() => {
        (async () => {
          const contractData = await fetchContractData(decodedTitle);
          console.log("test", contractData);
          setQuestions(contractData.questions);
          setTitle(contractData.metadata.title);
        })();
      }, []);

      let question;
      let answers;

      if (questions[activeQuestion]) {
        question = questions[activeQuestion].question;
        answers = questions[activeQuestion].answers;
      } else {
        question = undefined;
        answers = undefined;
      }

      //   Select and check answer
      const onAnswerSelected = (idx) => {
        setChecked(true);
        let currentQuestion=questions[activeQuestion]
        let currentAnswer=questions[activeQuestion].answers[idx]
        setMyEntry([...myEntry,{
          id:currentQuestion.id,
          ...currentQuestion,
          answer:idx
        }])

        setSelectedAnswerIndex(idx);
      };

      // Calculate score and increment to next question
      const nextQuestion = async () => {
        setSelectedAnswerIndex(null);
        if (activeQuestion !== questions.length - 1) {
          setActiveQuestion((prev) => prev + 1);
        } else
        {
          const userSigner = new InjectedArweaveSigner(
            (window as any).arWallet
          );
          await userSigner.setPublicKey();
          const quizContract = warp
            .contract(decodedTitle.split(":")[1])
            .connect(userSigner as any);
            await quizContract.writeInteraction({
              function:"setOwnEntry",
              questions:myEntry
            })
          setActiveQuestion(0);
          setShowResult(true);

        }
        setChecked(false);
      };

      return (
        <div className="container success-page">
          <h1>{title}</h1>
          {question ? (
            <>
              <div>
                <h2>
                  Question: {activeQuestion + 1}
                  <span>/{questions.length}</span>
                </h2>
              </div>
              <div>
                {!showResult ? (
                  <div className="quiz-container">
                    <h3>{questions[activeQuestion].question}</h3>
                    {answers.map((answer, idx) => (
                      <li
                        key={idx}
                        onClick={() => onAnswerSelected(idx)}
                        className={
                          selectedAnswerIndex === idx
                            ? "li-selected"
                            : "li-hover"
                        }
                      >
                        <span>{answer.caption}</span>
                      </li>
                    ))}
                    {checked ? (
                      <button onClick={nextQuestion} className="btn">
                        {activeQuestion === question.length - 1
                          ? "Finish"
                          : "Next"}
                      </button>
                    ) : (
                      <button
                        onClick={nextQuestion}
                        disabled
                        className="btn-disabled"
                      >
                        {" "}
                        {activeQuestion === question.length - 1
                          ? "Finish"
                          : "Next"}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="quiz-container">
                    <div>
                      <h3>Thank You for Taking the Quiz!</h3>
                      <p>Stay tuned for the results.</p>
                      <Link href="/">
                        <button>Go back to home</button>
                      </Link>
                    </div>
                    {/* Add confetti when showResult is true */}
                    <Confetti
                      width={800} // Customize the width of the confetti container
                      height={600} // Customize the height of the confetti container
                      numberOfPieces={200} // Adjust the number of confetti pieces
                      recycle={false} // Set to true if you want confetti to recycle
                      gravity={0.2} // Adjust the gravity to control the confetti falling speed
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <p> No questions </p>
          )}
        </div>
      );
    }),
  {
    ssr: false,
  }
);

export default QuizPage;
