import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useFeedBack = () => {
  const { mutate: getResumeFeedback, isPending: isLoading } = useMutation<
    string, // return type
    Error,
    { resume: string; role: string }
  >({
    mutationFn: async ({ resume, role }) => {
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("targetrole", role);
      const res = await fetch("/api/resfeedback", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        toast.error("Error providing feedback😥...")
        console.error(data.error);
      }

      return data.feedback as string;
    },
  });

  return { getResumeFeedback, isLoading };
};

export default useFeedBack;