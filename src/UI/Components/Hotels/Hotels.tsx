import { useSearchParams } from "react-router-dom";

interface IProps {}

const Hotels = ({}: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  console.log(destination);

  return <div></div>;
};

export default Hotels;
