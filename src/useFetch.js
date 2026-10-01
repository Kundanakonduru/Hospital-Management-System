import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      setLoad(true);
      setError(null);

      const res = await axios.get(url);

      console.log("Fetched data:", res.data);

      setData(res.data);
    } catch (error) {
      console.log("Fetch error:", error);
      setError(error);
    } finally {
      setLoad(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return {
    data,
    load,
    error,
  };
}

export default useFetch;