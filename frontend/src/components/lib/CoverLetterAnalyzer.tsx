import { useEffect } from 'react'
import { useState, ChangeEvent, FormEvent} from 'react';
import useGetCoverLetterFeedback from '../../hooks/coverletter/useGetFeedback';
import getLetter from '../../hooks/coverletter/useGetLetter';
import Spinner from '../skeleton/Spinner';
import { toast } from 'sonner';

const CoverLetterAnalyzer = () => {
  const [file, setFile] = useState<File | any>();
  const [role, setRole] = useState<string>("");
  const [result, setResult] = useState<string>("");
  

    const {getCoverLetterFeedback, isLoading } = useGetCoverLetterFeedback();

    const handleSubmit =  async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      if(file) {
        const text = await getLetter(file);

        if(text) {
          getCoverLetterFeedback({letter: text, role}, {
          onSuccess: (data) => {
            setResult(data);
            toast.success("Cover Letter Analyzed");
          },
          onError: (error) => {
            console.error("Error getting feedback", error)
            setResult("Error getting feedback:" + error.message)
          }
          
        })
        }
        
      }

    };
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        console.log(selectedFile); // Allow same file to be selected again
      }
    };
    useEffect(()=> {
      if (file) {
        console.log("New File: ", file)
      }
    }, [file])

  
  return (
    <div className="min-h-screen bg-background text-white p-6 flex items-center justify-center">
      <div className="max-w-3xl mx-auto bg6 shadow-lg rounded-2xl p-8 w-full">
        <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">Smart Cover Letter Analyzer</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Upload Cover letter (PDF, DOCX)</label>
            <input
              type="file"
              accept=".pdf, .docx"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Target Job Role</label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              className="w-full border border-gray-300 rounded-md p-2 text-black"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Analyze Cover Letter
          </button>
        </form>

        {isLoading && (
        <div className="flex flex-col justify-center items-center mt-4">
        <Spinner />
        </div>
        )}
      {result && !isLoading && (
      <div className="mt-8 bg-gray-100 p-4 rounded-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-2 text-gray-700">AI Feedback:</h2>
        <pre className="text-wrap text-black font-poppins">{result}</pre>
      </div>
      )}
      </div>
    </div>
  )
}

export default CoverLetterAnalyzer