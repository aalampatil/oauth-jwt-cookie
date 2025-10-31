import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

  

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null)
  const [loading, setLoading] = useState(true)
  //loading removes the initial error while data is being fetched like, check auth intially if user is not logged/authenticated it will show unauthorised error in console, add loading state it won't show any error
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const googleAuth = async () => {
    try {
        window.open(`${backendUrl}/auth/google`, "_self"); //you cant use axios/fetch here   
    } catch (error) {
        console.log(error.message);      
    }
  }

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${backendUrl}/auth/check-auth`, {withCredentials: true})
      //console.log(response.data);      
      if(response.data.success) {
        setAuthUser(response.data.user)
      }       
    } catch (error) {
      console.log(error.message);
      setAuthUser(null) 
    } finally {
       setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth() 
  }, [])

  const value = {
    backendUrl,
    googleAuth,
    authUser,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
}
