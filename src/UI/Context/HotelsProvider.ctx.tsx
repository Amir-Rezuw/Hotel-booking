import { ReactNode, createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { IHotelsData } from "../../Types/IHotelsData";
import { Api } from "../../env/Api";
import { env } from "../../env/env";
import useHttpRequest from "../hooks/useHttpRequest";
interface IHotelsCtx {
  isLoading: boolean;
  hotels: IHotelsData[];
}
const HotelContext = createContext<IHotelsCtx>({
  isLoading: false,
  hotels: [],
});
const HotelsProviderContext = ({ children }: { children: ReactNode }) => {
  const [searchParams, _setSearchParams] = useSearchParams();

  const roomOptions = JSON.parse(searchParams.get("options") ?? "{}");
  const destination = searchParams.get("destination");
  const { data: hotels, isLoading } = useHttpRequest<IHotelsData>(
    `${env.baseUtl}${Api.hotels}`,
    `q=${destination || ""}&accommodates_gte=${roomOptions?.room || 1}`
  );
  return (
    <HotelContext.Provider value={{ isLoading, hotels }}>
      {children}
    </HotelContext.Provider>
  );
};

export default HotelsProviderContext;

export const useHotels = () => {
  return useContext(HotelContext);
};
