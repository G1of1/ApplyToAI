import { useMutation } from "@tanstack/react-query";

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
        throw new Error(data.error || "Unknown server error");
      }

      return data.feedback as string;
    },
  });

  return { getResumeFeedback, isLoading };
};

export default useFeedBack;