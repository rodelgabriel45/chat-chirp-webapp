import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { setCurrentUser } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const useSignin = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = async (userData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      dispatch(setCurrentUser(data));
      navigate("/");
      toast.success("Signed in successfully!");
    } catch (error) {
      toast.error(error.message || error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signin };
};

export default useSignin;
