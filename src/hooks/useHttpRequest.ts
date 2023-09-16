import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IHotelsData } from "../Types/IHotelsData";

export default function useHttpRequest(url: string, query: string = "") {
  const [data, setData] = useState<IHotelsData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}?${query}`);
        setData(data);
      } catch (err) {
        let message = "Unknown Error";
        if (err instanceof Error) {
          message = err.message;
        }
        setData([]);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [query, url]);

  return { isLoading, data };
}
