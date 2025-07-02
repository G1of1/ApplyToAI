import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Spinner from "../skeleton/Spinner";
import getResume from "../../hooks/resume/useGetResume";
import useFeedBack from "../../hooks/resume/useGetFeedback";
import { toast } from "sonner";
import { useUser } from "@supabase/auth-helpers-react";
import useSaveFeedback from "../../hooks/feedback/useSaveFeedback";
function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [role, setRole] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [resume, setResume] = useState<string>("");
  const user = useUser();
  
  const { getResumeFeedback, isLoading } = useFeedBack();
  const {saveFeedback, isLoading: isSaving } = useSaveFeedback();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return;
    const text = await getResume(file);
    setResume(text);

    getResumeFeedback(
      { resume: text, role },
      {
        onSuccess: (data) => {
          setResult(data); // Store it in React state
          toast.success("Resume analyzed");
        },
        onError: (error) => {
          console.error("Error fetching feedback:", error);
        },
      }
    );

   
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

    const handleSaveFeedback = () => {
      saveFeedback({id: user?.id as string, type: "ResumeFeedback", content: resume, feedback: result}, {
        onSuccess: (data) => {
          toast.success(data)
        },
        onError: (error) => {
          toast.error(`${error}`)
        }
      });
    }
  useEffect(() => {
    if(file) {
      toast.info(`File Uploaded: ${file}`)
    }
  }, [file])
  return (
    <div className="min-h-screen bg-background text-gray-200 p-6 flex items-center justify-center">
      <div className="max-w-3xl mx-auto bg5 shadow-lg rounded-2xl p-8 w-full">
        <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">Smart Resume Analyzer</h1>

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
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Analyze Resume
          </button>
        </form>

        {isLoading && (
        <div className="flex flex-col justify-center items-center mt-4">
        <Spinner />
        </div>
        )}
      {result && !isLoading && (
        <>
      <div className="mt-8 bg-gray-100 p-4 rounded-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-2 text-gray-700">AI Feedback:</h2>
        <pre className="text-wrap text-black font-poppins">{result}</pre>
      </div>
      <button className="bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700" onClick={handleSaveFeedback}>
        {isSaving ? "Saving..." : "Save"}
      </button>
      </>
      )}
      </div>
    </div>
  );
}

export default ResumeAnalyzer