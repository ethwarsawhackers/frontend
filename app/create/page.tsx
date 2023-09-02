'use client';

import React, { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import { quizzes, Quiz, QuizQuestion } from '../data';
import Confetti from 'react-confetti';

const CreateQuizPage: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // State to control confetti visibility

  const addQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        id: prevQuestions.length + 1,
        question: '',
        answers: [''], // Initialize with one answer option
        correctAnswer: undefined,
        note: '',
      },
    ]);
  };

  const addAnswerOption = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answers.push('');
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
    updatedQuestions[index].answers[answerIndex] = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (index: number, answer: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAnswer = answer;
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
    setQuestions([
      {
        id: 1,
        question: '',
        answers: [''],
        correctAnswer: undefined,
        note: '',
      },
    ]);
    setIsSubmitted(true);
  };

  const handleSubmit = () => {
    const hasUndefinedCorrectAnswer = questions.some((q) => q.correctAnswer === undefined);

    if (hasUndefinedCorrectAnswer)
    {
      alert('Please select a correct answer for all questions.');
    } else
    {
      let newQuiz: Quiz = {
        totalQuestions: questions.length,
        questions: questions.map((q) => ({
          id: q.id,
          question: q.question,
          answers: q.answers,
          correctAnswer: q.correctAnswer,
          note: q.note,
        })),
      };

      quizzes.push(newQuiz);

      console.log('Updated Quiz:', quizzes);

      resetForm();

      // Show confetti upon successful submission
      setShowConfetti(true);

      // Hide confetti after a few seconds (adjust as needed)
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }
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
                    value={answer}
                    onChange={(event) => handleAnswerChange(event, index, answerIndex)}
                  />
                  <label>
                    <input
                      type='radio'
                      name={`correctAnswer_${index}`}
                      checked={question.correctAnswer === question.answers[answerIndex]}
                      onChange={() => handleCorrectAnswerChange(index, question.answers[answerIndex])}
                    />
                    Correct Answer
                  </label>
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
        <Link href="/allQuizzes">
          <button className="button">View All Quizzes</button>
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
