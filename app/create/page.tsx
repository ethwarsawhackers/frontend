"use client";

import React, { useState, ChangeEvent } from "react";
import Link from "next/link";
import { contracts, QuizContract, QuizQuestion, Metadata } from "../data";
import Confetti from "react-confetti";
import { v4 as uuidv4 } from "uuid";
import TextField from "@mui/material/TextField";
import wallet from "../components/Arweave";

const CreateQuizPage: React.FC = () => {
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

  const [questions, setQuestions] = useState<QuizQuestion[]>(emptyQuestions);
  const [metadata, setMetadata] = useState<Metadata>(emptyMetadata);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

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

  const handleSubmit = async () => {
    await wallet.connect();
    console.log(`Creating form with address ${wallet.address}`);

    // Check if any of the required fields in the metadata are empty
    if (
      !metadata?.title ||
      !metadata?.tokens ||
      !metadata?.ticker ||
      !metadata?.chain ||
      metadata?.allow.length === 0 ||
      !metadata?.maxEntries ||
      !metadata?.note
    ) {
      alert("Please fill in all fields before submitting.");
      return; // Prevent further processing if validation fails
    }

    // Check if any of the questions or answers are empty
    if (
      questions.some((q) => !q.question || q.answers.some((a) => !a.caption))
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

    contracts.push(newContract);

    console.log("Updated Contracts:", contracts);

    resetForm();

    // Show confetti upon successful submission
    setShowConfetti(true);

    // Hide confetti after a few seconds (adjust as needed)
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
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

        <h2 className="quiz-details-header">Quiz Details</h2>
        {/* Metadata Section */}
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
          />
          <TextField
            id="outlined-basic"
            label="Allowed participants"
            variant="outlined"
            onChange={(event) =>
              setMetadata({ ...metadata, allow: event.target.value })
            }
            value={metadata?.allow}
            className="text-input"
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
                    />
                    {question.answers.length > 1 && (
                      <button
                        onClick={() => removeAnswerOption(index, answerIndex)}
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
              />
              <button
                onClick={() => removeQuestion(index)}
                className="btn-cancel remove-qn-btn"
              >
                Remove Question
              </button>
            </div>
          ))}
          <button onClick={addQuestion} className="btn-secondary add-qn-btn">
            Add Question
          </button>
          <button
            onClick={handleSubmit}
            className="btn-primary submit-quiz-btn"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    );
  };

  const renderSuccessMessage = () => {
    return (
      <div>
        {renderConfetti()}
        <h1>Quiz Created Successfully!</h1>
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
};

export default CreateQuizPage;
