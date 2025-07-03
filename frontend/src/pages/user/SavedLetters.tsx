import { useState } from 'react';
import { toast } from 'sonner';
import useGetSavedFeedback from '../../hooks/feedback/useGetFeedback';
import useDeleteFeedback from '../../hooks/feedback/useDeleteFeedback';
import Spinner from '../../components/skeleton/Spinner';

interface FeedbackEntry {
  id: string;
  type: 'CoverLetterFeedback' | 'ResumeFeedback';
  content: string;
  feedback: string;
  created_at: string;
}

export default function SavedLettersPage() {
  const [activeTab, setActiveTab] = useState<'CoverLetterFeedback' | 'ResumeFeedback'>('CoverLetterFeedback');
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { feedbacks, isLoading, refetch } = useGetSavedFeedback();
  const { deleteFeedback, isLoading: isDeleting } = useDeleteFeedback();

  const handleDelete = async () => {
    if (!selectedId) return;
    deleteFeedback(
      { id: selectedId },
      {
        onSuccess: (data) => {
          toast.success(data);
          setShowModal(false);
          refetch();
        },
        onError: () => {
          toast.error('Failed to delete feedback.');
        },
      }
    );
  };

  const openModal = (id: string) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const filteredFeedback = feedbacks.filter((entry: FeedbackEntry) => entry.type === activeTab);

  return (
    <div className="max-w-4xl mx-auto p-6 text-white min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Saved</h1>

      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 rounded-l-lg ${activeTab === 'CoverLetterFeedback' ? 'bg-blue-600' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('CoverLetterFeedback')}
        >
          Cover Letter Feedback
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
              <pre className="whitespace-pre-wrap text-sm mb-2 font-poppins">{entry.feedback}</pre>
              <button
                className="text-red-500 hover:underline text-sm"
                onClick={() => openModal(entry.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p className="text-sm text-gray-300 mb-6">This will permanently delete this feedback.</p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? <div className="flex flex-col items-center justify-center"><Spinner /></div> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
