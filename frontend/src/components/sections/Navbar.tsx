import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-blue-500 font-bold text-xl"><Link to="/">ApplyToAI</Link></h1>
        <ul className="flex gap-6 text-gray-700 dark:text-gray-300 text-sm">
          <li className="hover:text-blue-500 duration-100"><Link to="/register">Register</Link></li>
          <li className="hover:text-blue-500 duration-100"><Link to="/login">Login</Link></li>
          <li className="hover:text-blue-500 duration-100"><Link to="/login">Resume Feedback</Link></li>
        </ul>
      </div>
    </nav>
  );
}