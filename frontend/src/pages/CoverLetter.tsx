import CoverLetterAnalyzer from '../components/lib/CoverLetterAnalyzer';

const CoverLetter = () => {
  return (
    <section className="min-h-[100vh] flex items-center justify-center px-4 py-14 text-blue-200">
      <div className="w-full max-w-5xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-blue-400">
            AI-Powered Cover Letter Analyzer
          </h1>
          <p className="text-lg sm:text-xl text-blue-300">
            Stand out to recruiters — Upload your Cover Letter for instant insights.
          </p>
        </div>

        {/* How it works card */}
        <div className="bg7 rounded-xl shadow-lg p-6 md:p-10 mb-10">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">How the analyzer works:</h2>
          <ul className="space-y-4 text-blue-200 list-decimal list-inside">
            <li>
              <strong>Upload your Cover Letter</strong> — Supported formats: PDF, DOCX.
            </li>
            <li>
              <strong>Add the target role</strong> — Get personalized, role-specific feedback.
            </li>
            <li>
              <strong>Receive instant AI-powered analysis</strong> — Includes clarity, alignment, grammar, and suggestions.
            </li>
          </ul>
        </div>

        {/* Analyzer Component */}
        <div className="bg7 rounded-xl p-6 md:p-8 shadow-md">
          <CoverLetterAnalyzer />
        </div>
      </div>
    </section>
  );
};

export default CoverLetter;