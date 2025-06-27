import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import getLetter from '../../hooks/coverletter/useGetLetter';
import useCoverLetterGenerator from '../../hooks/generator/useCLGenerator';
import Spinner from '../skeleton/Spinner';

const CoverLetterGenerator = () => {
  const [file, setFile] = useState<File | null>(null);
  const [resume, setResume] = useState<string | any>('');
  const [role, setRole] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [job, setJob] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const { getCoverLetter, isLoading } = useCoverLetterGenerator();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file) {
      const text = await getLetter(file);
      setResume(text);

      if (text) {
        console.log("Resume: ", resume);
        console.log("Job: ", job);
        console.log("Name: ", name);
        console.log("Company: ", company);
        console.log("Role: ", role);

        getCoverLetter(
          { job, resume: text, role, name, company },
          {
            onSuccess: (data) => {
              setResult(data);
              toast.success('Cover Letter Generated');
            },
            onError: (error) => {
              toast.error(`Error getting feedback: ${error}`);
            },
          }
        );
      }
    } else {
      toast.error('All necessary requirements have not been provided.');
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
        <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">Smart Cover Letter Generator</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Upload Resume (PDF, DOCX)</label>
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

          <div>
            <label className="block font-semibold mb-1">Company</label>
            <input
              type="text"
              placeholder="e.g. Google"
              className="w-full border border-gray-300 rounded-md p-2 text-black"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Your Name</label>
            <input
              type="text"
              placeholder="e.g. Jane Doe"
              className="w-full border border-gray-300 rounded-md p-2 text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Job Description</label>
            <textarea
              placeholder="Paste the job description here"
              className="w-full border border-gray-300 rounded-md p-2 text-black min-h-[100px]"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Generate Cover Letter
          </button>
        </form>

        {isLoading && (
          <div className="flex flex-col justify-center items-center mt-4">
            <Spinner />
          </div>
        )}

        {result && !isLoading && (
          <div className="mt-8 bg-gray-100 p-4 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-2 text-gray-700">Generated Cover Letter:</h2>
            <pre className="text-wrap text-black font-poppins whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
