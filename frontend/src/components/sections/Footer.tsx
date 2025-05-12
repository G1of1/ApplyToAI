import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f172a] text-blue-300 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left space-y-4 sm:space-y-0">
        <p className="text-sm">&copy; {new Date().getFullYear()} ApplyToAI. All rights reserved.</p>

        <div className="flex space-x-6 text-sm">
          <Link to="/resume-analyzer" className="hover:text-white transition-colors duration-200">
            Resume Analyzer
          </Link>
          <Link to="/cover-letter-analyzer" className="hover:text-white transition-colors duration-200">
            Cover Letter Analyzer
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;