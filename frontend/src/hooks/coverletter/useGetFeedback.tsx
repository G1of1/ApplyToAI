import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
const useGetCoverLetterFeedback = () => {
    const {mutate: getCoverLetterFeedback, isPending: isLoading } = useMutation<string, Error, {letter: string, role: string}>({
      mutationFn: async ({letter, role}) => {
        
        const formData = new FormData();
        formData.append("letter", letter);
        formData.append("role", role);
        const res = await fetch("/api/clfeedback", {
        method: "POST",
        body: formData,
      });

        const data = await res.json();

        if(!res.ok || data.error) {
          toast.error(data.error);
          throw new Error(data.error || "Unknown server error")
        }
        return data.feedback as string
      }
    })
  
    return { getCoverLetterFeedback, isLoading }
}

export default useGetCoverLetterFeedback