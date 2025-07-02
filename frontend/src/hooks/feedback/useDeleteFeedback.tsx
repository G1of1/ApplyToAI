import { useMutation } from "@tanstack/react-query"
import { supabase } from "../../supbaseClient";
import { toast } from "sonner";

const useDeleteFeedback  = () => {
    const {mutate: deleteFeedback, isPending: isLoading } = useMutation<string , Error, {id: string}>({
        mutationFn: async ({id}) => {
            const token = await supabase.auth.getSession().then((res) => res.data.session?.access_token);
            const res = await fetch('/api/feedback', {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}`, "Content-Type" : 'application/json'},
                body: JSON.stringify({id})
            })

            const data = await res.json();

            if(!res.ok || data.error) {
                toast.error("Error deleting feedback...😥")
                console.error(data.error)
            }
            
            return data.message as string
        }
    })

    return {deleteFeedback, isLoading };
}

export default useDeleteFeedback;