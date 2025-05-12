import React from 'react'

const Hero: React.FC = () => {
  return (
        <section className="min-h-[70vh] flex items-center justify-center px-4 py-16">
          <div className="max-w-3xl text-center text-blue-400">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            AI-Powered Resume Insights in Seconds
            </h1>
            <p className="text-lg sm:text-xl mb-8">
              Get personalized feedback on your resume and cover letter. Stand out to recruiters with our AI-powered tools.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/resume-analyzer"
                className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-500 transition"
              >
                Try Resume Analyzer
              </a>
              <a
                href="/cover-letter-analyzer"
                className="bg-transparent border border-blue-500 text-blue-300 font-semibold py-3 px-6 rounded-xl hover:bg-blue-600 hover:text-white transition"
              >
                Try Cover Letter Analyzer
              </a>
            </div>
          </div>
        </section>
  )
}

export default Hero