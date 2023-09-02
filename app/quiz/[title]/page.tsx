"use client";

import React, { useState } from "react";
import Link from 'next/link';
import Confetti from 'react-confetti';
import { contracts } from "../../data";

const QuizPage = ({ params }: { params: { title: string; }; }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const decodedTitle = decodeURIComponent(params.title);
  const questions = contracts.find(contract => contract.metadata.title === decodedTitle).questions;
  const { question, answers } = questions[activeQuestion];

  //   Select and check answer
  const onAnswerSelected = (idx) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
  };

  // Calculate score and increment to next question
  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    if (activeQuestion !== questions.length - 1)
    {
      setActiveQuestion((prev) => prev + 1);
    } else
    {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };

  return (
    <div className="container">
      <h1>{decodedTitle}</h1>
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
                  selectedAnswerIndex === idx ? "li-selected" : "li-hover"
                }
              >
                <span>{answer.caption}</span>
              </li>
            ))}
            {checked ? (
              <button onClick={nextQuestion} className="btn">
                {activeQuestion === question.length - 1 ? "Finish" : "Next"}
              </button>
            ) : (
              <button onClick={nextQuestion} disabled className="btn-disabled">
                {" "}
                {activeQuestion === question.length - 1 ? "Finish" : "Next"}
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
    </div>
  );
};

export default QuizPage;
