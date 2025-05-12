import { useMutation } from "@tanstack/react-query";
const useGetCoverLetterFeedback = () => {
    const {mutate: getCoverLetterFeedback, isPending: isLoading } = useMutation<string, Error, {letter: string, role: string}>({
      mutationFn: async ({letter, role}) => {
        
        const formData = new FormData();
        formData.append("letter", letter);
        formData.append("role", role);
        console.log(formData)
        const res = await fetch("http://localhost:5000/clfeedback", {
        method: "POST",
        body: formData,
      });

        const data = await res.json();

        if(!res.ok || data.error) {
          throw new Error(data.error || "Unknown server error")
        }
        return data.feedback as string
      }
    })
  
    return { getCoverLetterFeedback, isLoading }
}

export default useGetCoverLetterFeedback