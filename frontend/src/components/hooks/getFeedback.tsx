
const getFeedback = async (resume: string, role: string) => {
  if(resume && role) {
    const formData = new FormData();
    formData.append('resume', resume); 
    formData.append('targetrole', role)

    try {
        const res = await fetch("http://localhost:5000/feedback", {
            method: "POST",
            body: formData,
          });

        const data = await res.json();
        
        if(data.error) {
            return null
        }
        return data.feedback;
    }
    catch(error) {
        console.error("Error while getting feedback:", error);
    }
  }
}

export default getFeedback