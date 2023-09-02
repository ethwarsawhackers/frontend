import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className='container'>
        <h1>Quiz App</h1>
        <Link href='/quiz'>
          <button>Create Quiz</button>
        </Link>
        <Link href='/quiz'>
          <button>View all Quizzes</button>
        </Link>
      </div>
    </main>
  );
}
