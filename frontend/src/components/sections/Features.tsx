import React from 'react'
import { Link } from 'react-router-dom';
const Features: React.FC = () => {
    return (
      <section className=" text-blue-200 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-blue-400">
            Powerful AI Features to Boost Your Job Applications
          </h2>
          <p className="text-blue-300 mb-12 max-w-2xl mx-auto">
            Our advanced AI tools give you real-time insights and actionable tips
            to help your resume and cover letter stand out in today’s competitive job market.
          </p>
  
          <div className="grid gap-8 md:grid-cols-2">
            {/* Resume Analyzer */}
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
  
            {/* Cover Letter Analyzer */}
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
    );
  };

export default Features