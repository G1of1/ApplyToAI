import { toast } from "sonner";

//Extract text for resume analyzer
const getResume = async (file: File) => {
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
              toast.error("Error extracting resume😥...")
              console.error("Error while extracting resume:", error);
            }
            
    }
}

export default getResume