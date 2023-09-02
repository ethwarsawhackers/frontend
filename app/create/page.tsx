'use client';

import React, { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import { contracts, QuizContract, QuizQuestion, Metadata } from '../data';
import Confetti from 'react-confetti';
import { v4 as uuidv4 } from 'uuid';

const CreateQuizPage: React.FC = () => {
  const emptyEntry = [
    {
      "author": "",
      "questions": []
    }
  ];

  const emptyMetadata = {
    "title": "",
    "tokens": "",
    "ticker": "",
    "chain": "",
    "allow": [""],
    "maxEntries": "",
    "note": "",
    "style": undefined
  };

  const emptyQuestions = [
    {
      id: uuidv4(),
      question: '',
      answers: [{ caption: '' }],
      note: '',
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
        question: '',
        answers: [{ caption: '' }], // Initialize with one answer option
        note: '',
      },
    ]);
    console.log(uuidv4);
  };

  const addAnswerOption = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answers.push({ caption: '' });
    setQuestions(updatedQuestions);
  };

  const removeAnswerOption = (index: number, answerIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answers.splice(answerIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>, index: number, answerIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answers[answerIndex] = { caption: event.target.value };
    setQuestions(updatedQuestions);
  };

  const handleNoteChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
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

  const handleSubmit = () => {
    // Check if any of the required fields in the metadata are empty
    if (
      !metadata?.title ||
      !metadata?.tokens ||
      !metadata?.ticker ||
      !metadata?.chain ||
      metadata?.allow.length === 0 ||
      !metadata?.maxEntries ||
      !metadata?.note
    )
    {
      alert('Please fill in all fields before submitting.');
      return; // Prevent further processing if validation fails
    }

    // Check if any of the questions or answers are empty
    if (questions.some((q) => !q.question || q.answers.some((a) => !a.caption)))
    {
      alert('Please fill in all questions and answers.');
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
      questions: questionsWithBase64Notes
    };

    contracts.push(newContract);

    console.log('Updated Contracts:', contracts);

    resetForm();

    // Show confetti upon successful submission
    setShowConfetti(true);

    // Hide confetti after a few seconds (adjust as needed)
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  const renderConfetti = () => {
    if (showConfetti)
    {
      return <Confetti />;
    }
    return null;
  };

  const renderForm = () => {
    return (
      <div className='container'>
        <h1>Create Quiz</h1>

        {/* Metadata Section */}
        <div>
          <label>
            Title:
            <input
              type='text'
              placeholder='Enter title'
              value={metadata?.title}
              onChange={(event) => setMetadata({ ...metadata, title: event.target.value })}
            />
          </label>
          <label>
            Tokens:
            <input
              type='number'
              placeholder='Enter number of tokens'
              value={metadata?.tokens}
              onChange={(event) => setMetadata({ ...metadata, tokens: event.target.value })}
            />
          </label>
          <label>
            Ticker:
            <input
              type='text'
              placeholder='Enter ticker'
              value={metadata?.ticker}
              onChange={(event) => setMetadata({ ...metadata, ticker: event.target.value })}
            />
          </label>
          <label>
            Chain:
            <input
              type='text'
              placeholder='Enter chain'
              value={metadata?.chain}
              onChange={(event) => setMetadata({ ...metadata, chain: event.target.value })}
            />
          </label>
          <label>
            Allow:
            <input
              type='text'
              placeholder='Enter allowed participants'
              value={metadata?.allow}
              onChange={(event) => setMetadata({ ...metadata, allow: [event.target.value] })}
            />
          </label>
          <label>
            Max Entries:
            <input
              type='number'
              placeholder='Enter maximum number of entries'
              value={metadata?.maxEntries}
              onChange={(event) => setMetadata({ ...metadata, maxEntries: event.target.value })}
            />
          </label>
          <label>
            Note:
            <input
              type='text'
              placeholder='Enter description of quiz'
              value={metadata?.note}
              onChange={(event) => setMetadata({ ...metadata, note: event.target.value })}
            />
          </label>
        </div>

        {/* Questions Section */}
        {questions.map((question, index) => (
          <div key={index}>
            <h2>Question {index + 1}</h2>
            <input
              type='text'
              placeholder='Enter your question'
              value={question.question}
              onChange={(event) => handleQuestionChange(event, index)}
            />
            <ul>
              {question.answers.map((answer, answerIndex) => (
                <li key={answerIndex}>
                  <input
                    type='text'
                    placeholder={`Enter answer ${answerIndex + 1}`}
                    value={answer.caption}
                    onChange={(event) => handleAnswerChange(event, index, answerIndex)}
                  />
                  {question.answers.length > 1 && (
                    <button onClick={() => removeAnswerOption(index, answerIndex)}>Remove Option</button>
                  )}
                </li>
              ))}
            </ul>
            <button onClick={() => addAnswerOption(index)}>Add Option</button>
            <input
              type='text'
              placeholder='Enter note for this question'
              value={question.note}
              onChange={(event) => handleNoteChange(event, index)}
            />
            <button onClick={() => removeQuestion(index)}>Remove Question</button>
          </div>
        ))}
        <button onClick={addQuestion}>Add Question</button>
        <button onClick={handleSubmit}>Submit Quiz</button>
      </div>
    );
  };

  const renderSuccessMessage = () => {
    return (
      <div>
        {renderConfetti()}
        <h1>Quiz Created Successfully!</h1>
        <button onClick={() => setIsSubmitted(false)}>Create Another Quiz</button>
        <Link href="/allquizzes">
          <button className="button">View All quizzes</button>
        </Link>
      </div>
    );
  };

  return (
    <div className='container'>
      {isSubmitted ? renderSuccessMessage() : renderForm()}
    </div>
  );
};

export default CreateQuizPage;
