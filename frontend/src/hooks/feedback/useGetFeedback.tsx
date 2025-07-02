import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";
import { toast } from "sonner";

interface FeedbackEntry {
  id: string;
  type: "CoverLetterFeedback" | "ResumeFeedback";
  content: string;
  feedback: string;
  created_at: string;
}

const useGetSavedFeedback = () => {
  const { data, isPending, refetch } = useQuery<FeedbackEntry[], Error>({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const token = await supabase.auth.getSession().then((res) => res.data.session?.access_token);
      const res = await fetch("/api/feedback", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        console.error(data.error);
        toast.error("Error retrieving feedback");
        throw new Error("Failed to load feedback");
      }

      return data.feedbacks as FeedbackEntry[];
    },
  });

  return { feedbacks: data ?? [], isLoading: isPending, refetch };
};

export default useGetSavedFeedback;
