import { useState } from "react";
import toast from "react-hot-toast";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message);
      }

      toast.success("User created successfully!");
    } catch (error) {
      toast.error(error.message || error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
