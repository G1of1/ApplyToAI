import { useMutation } from "@tanstack/react-query";

const useCoverLetterGenerator = () => {
    const {mutate: getCoverLetter, isPending: isLoading } = useMutation<string, Error, {role: string, name: string, job: string, company: string, resume: string}>({
        mutationFn: async ({role, name, job, company, resume}) => {

            const formData = new FormData();
            formData.append('role', role);
            formData.append('name', name);
            formData.append('job', job);
            formData.append('company', company);
            formData.append('resume', resume);

            const res = await fetch('/api/generateCL', {
                method: "POST",
                body: formData
            })
            const data = await res.json();
            if(!res.ok || data.error) {
                throw new Error(data.error || "Unknown Server Error")
            }

            return data.coverletter as string;


        }
    })

    return { getCoverLetter, isLoading }
    

}




export default useCoverLetterGenerator;