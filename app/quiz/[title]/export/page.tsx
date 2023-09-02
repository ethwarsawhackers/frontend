'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { EntryQuestion, contracts } from "../../../data";
import Papa from 'papaparse';


const ExportPage: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(['']);
    const [finished, setFinished] = useState(false);

    const pathName = usePathname();
    const router = useRouter();

    // Use regular expressions to extract the desired part of the path
    const match = pathName.match(/\/quiz\/(.*?)\/export/);
    let title: string = "";

    if (match && match.length > 1)
    {
        const extractedPart = match[1]; // Get the part between "/quiz/" and "/export"
        title = decodeURIComponent(extractedPart);
        console.log(extractedPart);
    } else
    {
        console.log('No match found');
    }

    interface UserAnswers {
        author: string,
        questions: EntryQuestion[],
        score: number;
    }

    function getAllUserAnswers () {
        const userAnswers = {}; // Initialize an empty object to store user answers

        const contract = contracts.find(contract => contract.metadata.title === title);
        contract.entries.forEach((entry) => {
            const author = entry.author;
            const entryQuestions = entry.questions;

            // Check if the author is already in the userAnswers object
            if (!userAnswers[author])
            {
                userAnswers[author] = { author, questions: [], score: 0 };
            }

            // Merge the entry's questions with the existing questions for the author
            userAnswers[author].questions = entryQuestions;
        });

        // Convert the userAnswers object into an array of objects
        const userAnswersArray: UserAnswers[] = Object.values(userAnswers);

        return userAnswersArray;
    }

    const [userAnswers, setUserAnswers] = useState<UserAnswers[]>(getAllUserAnswers);

    useEffect(() => {
        console.log(userAnswers);
    }, [userAnswers]);

    const contract = contracts.find(contract => contract.metadata.title === title);
    const questions = contract.questions;
    const { question, answers } = questions[currentQuestionIndex];

    const handleAnswerSelection = (answerIndex: number) => {
        setSelectedAnswer(new Array(answerIndex.toString()));
    };

    const handleNextQuestion = () => {
        const updatedUserAnswers = [...userAnswers];

        updatedUserAnswers.forEach((userAnswer) => {
            const isCorrect = userAnswer.questions[currentQuestionIndex].answers.includes(selectedAnswer[0].toString());
            console.log(isCorrect);

            if (isCorrect)
            {
                // Find the corresponding userAnswer object and update its score
                const indexToUpdate = updatedUserAnswers.findIndex((ua) => ua.author === userAnswer.author);
                if (indexToUpdate !== -1)
                {
                    updatedUserAnswers[indexToUpdate] = {
                        ...updatedUserAnswers[indexToUpdate],
                        score: updatedUserAnswers[indexToUpdate].score + 1,
                    };
                    console.log(updatedUserAnswers);
                    setUserAnswers(updatedUserAnswers);
                    console.log(userAnswers);
                }
            }
        });

        // Update the userAnswers state with the updated array

        // Move to the next question.
        const nextQuestionIndex = currentQuestionIndex + 1;

        if (nextQuestionIndex < questions.length)
        {
            setCurrentQuestionIndex(nextQuestionIndex);
            setSelectedAnswer(['']);
        } else
        {
            setFinished(true); // Add this state variable
            exportToCSV();
        }
    };

    const currentQuestion = question;

    const exportToCSV = () => {
        const csvData = [];
        csvData.push(['Author', 'Score', 'Question ID', 'Given Option']);

        userAnswers.forEach((userAnswer) => {
            userAnswer.questions.forEach((question) => {
                csvData.push([
                    userAnswer.author,
                    userAnswer.score,
                    question.id,
                    question.answers,
                ]);
            });
        });

        // Create a CSV string
        const csvString = Papa.unparse(csvData);

        // Create a Blob with the CSV string
        const blob = new Blob([csvString], { type: 'text/csv' });

        // Create a download link and trigger the download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'quiz_results.csv';
        link.click();
    };

    return (
        <div className="container">
            <h1>Grading of answers</h1>
            <div className="question">
                <h2>Question {currentQuestionIndex + 1}</h2>
                <p>{currentQuestion}</p>
                <ul>
                    {answers.map((choice, index) => (
                        <li key={index}>
                            <label>
                                <input
                                    type="radio"
                                    name="answer"
                                    value={choice.caption}
                                    checked={selectedAnswer[0] === index.toString()}
                                    onChange={() => handleAnswerSelection(index)}
                                />
                                {choice.caption}
                            </label>
                        </li>
                    ))}
                </ul>
                <button onClick={handleNextQuestion}>
                    {currentQuestionIndex === questions.length - 1 ? 'Finish Grading' : 'Next Question'}
                </button>
            </div>
            {finished && (
                <p>Exporting to CSV file</p>
            )}
        </div>
    );
};

export default ExportPage;
