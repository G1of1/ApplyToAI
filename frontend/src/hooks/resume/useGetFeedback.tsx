import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "../../supbaseClient";

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

      const token = await supabase.auth.getSession().then((res) => res.data.session?.access_token);
      
      const res = await fetch("/api/resfeedback", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}`},
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