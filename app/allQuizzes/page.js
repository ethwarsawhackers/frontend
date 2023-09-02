"use client";
import React, { useState } from "react";
import { quizzes } from "../quizzes";

const page = () => {
  return (
    <main>
      <div className="container">
        <h1>All Quizzes</h1>
        {quizzes.map((quiz) => (
          <button key={quiz.id}>{quiz.metadata.title}</button>
        ))}
      </div>
    </main>
  );
};

export default page;
