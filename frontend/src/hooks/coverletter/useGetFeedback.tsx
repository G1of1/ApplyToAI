import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "../../supbaseClient";
const useGetCoverLetterFeedback = () => {
    const {mutate: getCoverLetterFeedback, isPending: isLoading } = useMutation<string, Error, {letter: string, role: string}>({
      mutationFn: async ({letter, role}) => {
        
        const formData = new FormData();
        formData.append("letter", letter);
        formData.append("role", role);

        const token = await supabase.auth.getSession().then((res) => res.data.session?.access_token);
        const res = await fetch("/api/clfeedback", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}`},
        body: formData,
      });

        const data = await res.json();

        if(!res.ok || data.error) {
          toast.error(data.error);
          console.error(data.error);
        }
        return data.feedback as string
      }
    })
  
    return { getCoverLetterFeedback, isLoading }
}

export default useGetCoverLetterFeedback