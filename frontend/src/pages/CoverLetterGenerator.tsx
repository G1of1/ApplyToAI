import CoverLetterGenerator from '../components/lib/CoverLetterGenerator';


const CoverLetterGenPage = () => {
  return (
    <section className="min-h-[100vh] flex items-center justify-center px-4 py-14 text-blue-200">
      <div className="w-full max-w-5xl">
        

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-blue-400">
            AI Cover Letter Generator
          </h1>
          <p className="text-lg sm:text-xl text-blue-300">
            Upload your resume and job details — we'll generate a personalized cover letter instantly.
          </p>
        </div>

        {/* How it works card */}
        <div className="bg7 rounded-xl shadow-lg p-6 md:p-10 mb-10">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">How it works:</h2>
          <ul className="space-y-4 text-blue-200 list-decimal list-inside">
            <li><strong>Upload your resume</strong> (PDF/DOCX)</li>
            <li><strong>Paste the job description</strong> or extract from job post</li>
            <li><strong>Enter role + company name</strong></li>
            <li><strong>Click generate</strong> — get a fully tailored cover letter in seconds</li>
          </ul>
        </div>

        {/* Generator Component */}
        <div className="bg7 rounded-xl p-6 md:p-8 shadow-md">
          <CoverLetterGenerator />
        </div>
      </div>
    </section>
  );
};

export default CoverLetterGenPage;
