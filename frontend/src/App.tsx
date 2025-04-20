import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import './App.css';
import getResume from "./components/hooks/getResume";
import getFeedback from "./components/hooks/getFeedback";
export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [role, setRole] = useState<string>("");
  const [result, setResult] = useState<string>("");


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return;
    const text = await getResume(file);

    const feedback = await getFeedback(text, role);

    if(feedback == null){
      setResult("Error getting feedback...😥")
    }
    else {
    setResult(feedback);
    }
  };
  /*const handleFileSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];


  }*/
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        console.log(selectedFile); // Allow same file to be selected again
      }
    };
  useEffect(() => {
    if(file) {
      console.log(`New File: ${file}`)
    }
  }, [file])
  return (
    <div className="min-h-screen w-screen bg-gray-50 text-gray-800 p-6 flex items-center justify-center">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 w-full">
        <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">Smart Resume Analyzer</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Upload Resume (PDF)</label>
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
              className="w-full border border-gray-300 rounded-md p-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Analyze Resume
          </button>
        </form>

        {result && (
          <div className="mt-8 bg-gray-100 p-4 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-2 text-gray-700">AI Feedback:</h2>
            <pre className="whitespace-pre-wrap text-sm">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

