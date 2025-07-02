import { Link } from "react-router-dom";
import { useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export default function UserNav() {
  const supabase = useSupabaseClient();
  const user = useUser(); // Automatically fetches the user
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login"; // Or use useNavigate()
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-blue-500 font-bold text-xl">
          <Link to="/dashboard">ApplyToAI</Link>
        </h1>

        <ul className="flex gap-6 text-gray-700 dark:text-gray-300 text-sm">
          <li><Link to="/resume-analyzer">Resume Feedback</Link></li>
          <li><Link to="/cover-letter-analyzer">CL Feedback</Link></li>
          <li><Link to="/cover-letter-generator">Generate CL</Link></li>
        </ul>

        {/* User Dropdown */}
        <div className="relative ml-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            {user?.email ?? "Account"}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
              <Link
                to="/saved"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Saved Letters
              </Link>
              <Link
                to="/account"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Account Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
