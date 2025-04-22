import { useAuth0 } from "@auth0/auth0-react";


     function useData() {
        const {user, isLoading, error} = useAuth0()
        let uploaded_courses = []
        let loaded = false
        const formData = new FormData()
            formData.append("id", user.email)
      
            const res = fetch("/api/uploaded_courses", {
              method: "POST",
              body: formData
            })
      
            const parsedres = res.json()
      
            uploaded_courses = parsedres.result
            console.log("data has been set")
            loaded = true

      return {uploaded_courses, loaded};
    }

    export default useData;
