import { toast } from "sonner";

// Safely extract text from uploaded file
const getLetter = async (file: File) => {
    if (file) {
        const formData = new FormData();
        formData.append("file", file);
        
            try {
              const res = await fetch("/api/extract", {
                method: "POST",
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
