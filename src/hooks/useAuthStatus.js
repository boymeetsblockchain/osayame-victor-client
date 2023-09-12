import  {useState,useEffect}from 'react'

function useAuthStatus() {
    const [user, setUser] = useState(null);

    useEffect(() => {
      // Check if there is a user in localStorage
      const userDataJson = localStorage.getItem("user");
      const userData = JSON.parse(userDataJson);
  
      if (userData) {
        setUser(userData);
      }
    }, []);
  
    return user;
}

export default useAuthStatus