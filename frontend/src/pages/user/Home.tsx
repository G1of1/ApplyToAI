import { Link } from "react-router-dom";
import { useUser } from "@supabase/auth-helpers-react";

export default function Home() {
  const user = useUser();

  return (
    <div className="min-h-screen py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Welcome{user?.email ? `, ${user.email}` : ""}!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Get started by selecting a tool below:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            to="/resume-analyzer"
            className="block bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
              Resume Feedback
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Upload your resume and get tailored feedback instantly.
            </p>
          </Link>

          <Link
            to="/cover-letter-analyzer"
            className="block bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-2">
              Cover Letter Feedback
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Submit your cover letter and receive AI-powered suggestions.
            </p>
          </Link>

          <Link
            to="/cover-letter-generator"
            className="block bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
              Cover Letter Generator
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Generate a new cover letter based on your resume and job description.
            </p>
          </Link>

          <Link
            to="/saved"
            className="block bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-2">
              Saved Feedback
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Access and manage your previously saved feedback and letters.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
