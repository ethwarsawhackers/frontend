import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="container">
        <h1>Magnetify</h1>
        <sub>Onboarding the next billion users</sub>
        <div className="functions-list">
          <Link href="/create">
            <button className="btn-secondary btn-home">Create Quiz</button>
          </Link>
          <Link href="/allquizzes">
            <button className="btn-secondary btn-home">View all Quizzes</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
