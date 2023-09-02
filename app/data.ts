export interface Quiz {
  totalQuestions: number;
  questions: Array<QuizQuestion>;
}

export interface QuizQuestion {
  id: number;
  question: string;
  answers: Array<string>;
  correctAnswer: string;
  note: string;
}

export const quizzes: Quiz[] = [
  {
    totalQuestions: 5,
    questions: [
      {
        id: 1,
        question: "What is the capital of France?",
        answers: ["Madrid", "Paris", "Rome", "Berlin"],
        correctAnswer: "Paris",
        note: "",
      },
      {
        id: 2,
        question: "What is the largest planet in our solar system?",
        answers: ["Mars", "Jupiter", "Venus", "Saturn", "test", "testss"],
        correctAnswer: "Jupiter",
        note: "",
      },
      {
        id: 3,
        question: "What is the smallest country in the world?",
        answers: ["Monaco", "Maldives", "Vatican City", "San Marino"],
        correctAnswer: "Vatican City",
        note: "",
      },
      {
        id: 4,
        question: "What is the most widely spoken language in the world?",
        answers: ["English", "Mandarin", "Spanish", "Hindi"],
        correctAnswer: "Mandarin",
        note: "",
      },
      {
        id: 5,
        question: "Who is the founder of Microsoft?",
        answers: ["Steve Jobs", "Bill Gates", "Elon Musk", "Mark Zuckerberg"],
        correctAnswer: "Bill Gates",
        note: "",
      },
    ],
  },
];
