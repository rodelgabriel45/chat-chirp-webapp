import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { setCurrentUser } from "../redux/user/userSlice";

const useUpdateProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const dispatch = useDispatch();
  const [modalStay, setModalStay] = useState(false);

  const updateProfile = async (userData) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setUpdatedUser(data);
      dispatch(setCurrentUser(data));
      toast.success("Profile Updated!");
      setModalStay(false);
    } catch (error) {
      setModalStay(true);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updatedUser, updateProfile, modalStay };
};

export default useUpdateProfile;
