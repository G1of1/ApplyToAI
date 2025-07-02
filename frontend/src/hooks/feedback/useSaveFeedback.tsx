import { useMutation } from "@tanstack/react-query"
import { supabase } from "../../supbaseClient";
import { toast } from "sonner";

const useSaveFeedback  = () => {
    const {mutate: saveFeedback, isPending: isLoading } = useMutation<string , Error, {id: string, type: string, content: string, feedback: string}>({
        mutationFn: async ({id,type, content, feedback}) => {
            const token = await supabase.auth.getSession().then((res) => res.data.session?.access_token);
            const res = await fetch('/api/feedback', {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}`, "Content-Type" : 'application/json'},
                body: JSON.stringify({user_id: id, type, content, feedback})
            })

            const data = await res.json();

            if(!res.ok || data.error) {
                toast.error("Error saving feedback...😥")
                console.error(data.error)
                throw new Error(data.error || "Error saving feedback")
            }
            
            return data.message as string
        }
    })

    return {saveFeedback, isLoading};
}

export default useSaveFeedback;