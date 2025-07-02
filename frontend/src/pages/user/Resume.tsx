import ResumeAnalyzer from '../../components/lib/ResumeAnalyzer';

const Resume = () => {
  return (
    <section className="min-h-[100vh] flex items-center justify-center px-4 py-14 text-blue-200">
      <div className="w-full max-w-5xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-blue-400">
            AI-Powered Resume Analyzer
          </h1>
          <p className="text-lg sm:text-xl text-blue-300">
            Level Up Your Job Hunt – Upload Your Resume for expert feedback.
          </p>
        </div>

        {/* How it works card */}
        <div className="bg7 rounded-xl shadow-lg p-6 md:p-10 mb-10">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">How the analyzer works:</h2>
          <ul className="space-y-4 text-blue-200 list-decimal list-inside">
            <li>
              <strong>Upload your Resume</strong> — Supported formats: PDF, DOCX.
            </li>
            <li>
              <strong>Add the target role</strong> — Get personalized, role-specific insights and keyword matches.
            </li>
            <li>
              <strong>Receive instant AI-powered analysis</strong> — Including summary, strengths, and score.
            </li>
          </ul>
        </div>

        {/* Analyzer Component */}
        <div className="bg7 rounded-xl p-6 md:p-8 shadow-md">
          <ResumeAnalyzer />
        </div>
      </div>
    </section>
  );
};

export default Resume;