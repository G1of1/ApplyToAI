import { toast } from "sonner";
import { supabase } from "../../supbaseClient";

// Safely extract text from uploaded file
const getLetter = async (file: File) => {
    if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const token = await supabase.auth.getSession().then((res) => res.data.session?.access_token);
            try {
              const res = await fetch("/api/extract", {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}`},
                body: formData,
              });
              const data = await res.json();
              if(data.error){
                console.error(data.error)
                return null;
              }
              return data.text;
            } catch (error) {
              console.error("Error while extracting resume:", error);
              toast.error("Error extracting resume😥...")
            }
            
    }
}

export default getLetter
