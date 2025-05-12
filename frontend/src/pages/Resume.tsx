
import ResumeAnalyzer from '../components/lib/ResumeAnalyzer'
const Resume = () => {

  return (
    <>
    <section className="min-h-[100vh] flex items-center justify-center px-4 py-14">
        <div className="max-w-full flex flex-col">
          <div className="w-full min-h-1 text-center text-blue-400 mt-4">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            AI-Powered Resume Analyzer
            </h1>
            <p className="text-lg sm:text-xl mb-8">
              Level Up Your Job Hunt – Upload Your Resume
            </p>
            </div>
            <div className="sm:flex items-center flex-col">
            <div className="bg7 max-w-2xl sm:flex-row justify-center gap-4 rounded-xl text-white">
                <h1 className="text-md sm:text-2xl font-bold mb-6 leading-tight m-5">
            How the analyzer works:
            </h1>
            <p className="text-lg sm:text-xl m-5">
              1. Upload your resume
            </p>
            <p className="text-sm sm: text-md mb-8 m-5">
                (PDF and DOCX)
            </p>
            <p className="text-lg sm:text-xl m-5">
                2. Add target role
            </p>
            <p className="text-sm sm: text-md mb-8 m-5">
                Include the job role to receive tailored feedback and match analysis.
            </p>
            <p className="text-lg sm:text-xl m-5">
                3. Get instant analysis
            </p>
            </div>
          
          <ResumeAnalyzer />
          </div>
          </div>
        </section>
        
        
        </>
  )
}

export default Resume