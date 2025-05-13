import { useState } from 'react';
import { Menu, X } from "lucide-react"; // icon package (lucide-react or use your own SVGs)
import { Link } from 'react-router-dom';
const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg7 text-blue-300 shadow-md fixed w-full">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold cursor-pointer hover:text-white transition-colors duration-200">
          <Link to="/">ApplyToAI</Link>
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 font-semibold">
          <Link
            to="/resume-analyzer"
            className="hover:text-white transition-colors duration-200"
          >
            AI Resume Analyzer
          </Link>
          <Link
            to="/cover-letter-analyzer"
            className="hover:text-white transition-colors duration-200"
          >
            AI Cover Letter Analyzer
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-blue-300"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 font-semibold">
          <Link
            to="/resume-analyzer"
            className="block hover:text-white transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            AI Resume Analyzer
          </Link>
          <Link
            to="/cover-letter-analyzer"
            className="block hover:text-white transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            AI Cover Letter Analyzer
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header