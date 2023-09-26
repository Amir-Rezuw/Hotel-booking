import axios from "axios";
import { ReactNode, createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IHotelsData } from "../../Types/IHotelsData";
import { Api } from "../../env/Api";
import { env } from "../../env/env";
import useHttpRequest from "../hooks/useHttpRequest";
interface IHotelsCtx {
  isLoading: boolean;
  hotels: IHotelsData[];
  getHotel: (id: string) => void;
  isCurrentHotelLoading: boolean;
  currentHotel: IHotelsData | null;
}
const HotelContext = createContext<IHotelsCtx>({
  isLoading: false,
  hotels: [],
  getHotel: () => {},
  isCurrentHotelLoading: true,
  currentHotel: null,
});
const HotelsProviderContext = ({ children }: { children: ReactNode }) => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const [isCurrentHotelLoading, setIsCurrentHotelLoading] = useState(false);
  const [currentHotel, setCurrentHotel] = useState<IHotelsData | null>(null);
  const roomOptions = JSON.parse(searchParams.get("options") ?? "{}");
  const destination = searchParams.get("destination");
  const { data: hotels, isLoading } = useHttpRequest<IHotelsData[]>(
    `${env.baseUrl}${Api.hotels}`,
    `q=${destination || ""}&accommodates_gte=${roomOptions?.room || 1}`
  );
  const getHotel = async (id: string) => {
    setIsCurrentHotelLoading(true);
    try {
      const { data } = await axios.get(`${env.baseUrl}${Api.hotels}${id}`);
      setCurrentHotel(data);
      setIsCurrentHotelLoading(false);
    } catch (error) {
      setIsCurrentHotelLoading(false);
    }
  };
  return (
    <HotelContext.Provider
      value={{
        isLoading,
        hotels: hotels ?? [],
        getHotel,
        currentHotel,
        isCurrentHotelLoading,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export default HotelsProviderContext;

export const useHotels = () => {
  return useContext(HotelContext);
};
