import { useSearchParams } from "react-router-dom";

const useUrlLocation = () => {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return [lat, lng];
};

export default useUrlLocation;
