import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "../../supbaseClient";

const useCoverLetterGenerator = () => {
    const {mutate: getCoverLetter, isPending: isLoading } = useMutation<string, Error, {role: string, name: string, job: string, company: string, resume: string}>({
        mutationFn: async ({role, name, job, company, resume}) => {

            const formData = new FormData();
            formData.append('role', role);
            formData.append('name', name);
            formData.append('job', job);
            formData.append('company', company);
            formData.append('resume', resume);
            
            const token = await supabase.auth.getSession().then((res) => res.data.session?.access_token);
            const res = await fetch('/api/generateCL', {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}`},
                body: formData
            })
            const data = await res.json();
            if(!res.ok || data.error) {
                toast.error("Error generating cover letter😥...")
                console.error(data.error);
            }

            return data.coverLetter as string;


        }
    })

    return { getCoverLetter, isLoading }
    

}




export default useCoverLetterGenerator;