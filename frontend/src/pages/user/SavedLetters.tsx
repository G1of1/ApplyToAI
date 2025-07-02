import { useState } from 'react';
//import { supabase } from '../../supbaseClient';
import useGetSavedFeedback from '../../hooks/feedback/useGetFeedback';
//import { toast } from 'sonner';

interface FeedbackEntry {
  id: string;
  type: 'CoverLetterFeedback' | 'ResumeFeedback';
  content: string;
  feedback: string;
  created_at: string;
}

export default function SavedLettersPage() {
  const [activeTab, setActiveTab] = useState<'CoverLetterFeedback' | 'ResumeFeedback'>('CoverLetterFeedback');

  const { feedbacks, isLoading } = useGetSavedFeedback();

  
  /*const handleDelete = async (id: string) => {
  if (!id) return;
  const { error } = await supabase.from("feedbacks").delete().eq("id", id);
  if (!error) {
    refetch(); // re-fetch data
  } else {
    toast.error("Failed to delete feedback...😥")
    console.error("Failed to delete feedback:", error);
  }
};*/


  const filteredFeedback = feedbacks.filter((entry: FeedbackEntry) => entry.type === activeTab);

  return (
    <div className="max-w-4xl mx-auto p-6 text-white min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Saved</h1>

      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 rounded-l-lg ${activeTab === 'CoverLetterFeedback' ? 'bg-blue-600' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('CoverLetterFeedback')}
        >
          Cover Letters
        </button>
        <button
          className={`px-4 py-2 rounded-r-lg ${activeTab === 'ResumeFeedback' ? 'bg-blue-600' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('ResumeFeedback')}
        >
          Resume Feedback
        </button>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : filteredFeedback.length === 0 ? (
        <p className="text-center text-gray-400">No saved feedback yet.</p>
      ) : (
        <ul className="space-y-4">
          {filteredFeedback.map((entry: FeedbackEntry) => (
            <li key={entry.id} className="bg-gray-800 p-4 rounded-md shadow-md">
              <div className="text-sm text-gray-400 mb-2">
                Saved on: {new Date(entry.created_at).toLocaleString()}
              </div>
              <pre className="whitespace-pre-wrap text-sm mb-2">{entry.feedback}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
