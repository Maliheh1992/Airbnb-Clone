import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useFetch(url, query = "") {
  const [data, setData] = useState([]);
  const [isLoading, setIsLading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLading(true);
        const { data } = await axios.get(`${url}?${query}`);
        setData(data);
      } catch (error) {
        setData([]);
        toast.error(error?.message);
      } finally {
        setIsLading(false);
      }
    }
    fetchData();
  }, [query, url]);

  return { isLoading, data };
}
