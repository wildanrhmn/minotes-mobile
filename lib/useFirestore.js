import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalProvider";

const useFirestore = (fn) => {
  const { session } = useGlobalContext();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fn();
      setData(res);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    if (session !== null) fetchData();
  }, []);

  const refetch = () => fetchData();
  return { data, refetch };
};

export default useFirestore;
