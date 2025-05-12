import React from "react";
import { Link } from "react-router-dom";

const CTA: React.FC = () => {
  return (
    <section className=" text-blue-400 py-16 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Land More Interviews?
        </h2>
        <p className="text-lg mb-8 text-blue-400">
          Use our AI-powered tools to perfect your resume and cover letter — all for free.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/resume-analyzer"
            className="bg-white text-blue-800 font-semibold px-6 py-3 rounded-xl hover:bg-blue-100 transition"
          >
            Try Resume Analyzer
          </Link>
          <Link
            to="/cover-letter-analyzer"
            className="bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-white hover:text-blue-800 transition"
          >
            Try Cover Letter Analyzer
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;