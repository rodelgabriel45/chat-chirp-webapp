import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/user");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        setConversations(data);
      } catch (error) {
        toast.error(error.message || error);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { conversations, loading };
};

export default useGetConversations;
