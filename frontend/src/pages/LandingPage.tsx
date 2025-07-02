import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="text-blue-200">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-3xl text-center text-blue-400">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            AI-Powered Resume Insights in Seconds
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Get personalized feedback on your resume and cover letter. Stand out to recruiters with our AI-powered tools.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/resume-analyzer"
              className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-500 transition"
            >
              Try Resume Analyzer
            </Link>
            <Link
              to="/cover-letter-analyzer"
              className="bg-transparent border border-blue-500 text-blue-300 font-semibold py-3 px-6 rounded-xl hover:bg-blue-600 hover:text-white transition"
            >
              Try Cover Letter Analyzer
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-blue-400">
            Powerful AI Features to Boost Your Job Applications
          </h2>
          <p className="text-blue-300 mb-12 max-w-2xl mx-auto">
            Our advanced AI tools give you real-time insights and actionable tips
            to help your resume and cover letter stand out in today’s competitive job market.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg7 p-6 rounded-xl shadow hover:shadow-lg transition duration-300 hover:translate-y-[-8px]">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">
                <Link to="/resume-analyzer">AI Resume Analyzer</Link>
              </h3>
              <ul className="list-disc list-inside space-y-2 text-blue-200 text-left">
                <li>Instant feedback on resume effectiveness</li>
                <li>Tailored suggestions for your target industry</li>
                <li>AI-generated score from 1 to 10</li>
                <li>Highlights weak areas with suggestions to improve</li>
              </ul>
            </div>

            <div className="bg7 p-6 rounded-xl shadow hover:shadow-lg transition duration-300 hover:translate-y-[-8px]">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">
                <Link to="/cover-letter-analyzer">AI Cover Letter Analyzer</Link>
              </h3>
              <ul className="list-disc list-inside space-y-2 text-blue-200 text-left">
                <li>Industry-specific feedback tailored to your role</li>
                <li>AI-generated clarity and impact score from 1 to 10</li>
                <li>Smart word choice alternatives for stronger impact</li>
                <li>Highlights fluff or vague phrases with better options</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-blue-400">
            Ready to Land More Interviews?
          </h2>
          <p className="text-lg mb-8 text-blue-300">
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
    </div>
  );
};

export default LandingPage;
