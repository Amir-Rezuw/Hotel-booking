import axios, { AxiosError } from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { IBookmarkedHotels } from "../../Types/IBookmarkedHotels";
import { Api } from "../../env/Api";
import { Keys } from "../../env/Enums/Keys";
import { env } from "../../env/env";

interface IBookmarkCtx {
  bookmarkList: IBookmarkedHotels[];
  bookmark: (newBookmark: IBookmarkedHotels) => void;
  isLoading: boolean;
  getBookmarks: ({ id }: { id: string }) => void;
  currentBookmark: IBookmarkedHotels | null;
  deleteBookmark: (id: number) => void;
}
const BookmarksContext = createContext<IBookmarkCtx>({
  bookmarkList: [],
  bookmark: () => {},
  isLoading: false,
  getBookmarks: () => {},
  currentBookmark: null,
  deleteBookmark: () => {},
});
const BookmarksListProvider = ({ children }: { children: ReactNode }) => {
  const [currentBookmark, setCurrentBookmark] =
    useState<IBookmarkedHotels | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [bookmarksList, setBookmarksList] = useState<IBookmarkedHotels[]>([]);
  useEffect(() => {
    const getBookmarkList = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${env.baseUrl}${Api.bookmarks}`);
        setBookmarksList(data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    getBookmarkList();
  }, []);
  const getBookmarks = async ({ id }: { id: string }) => {
    setIsLoading(true);
    setCurrentBookmark(null);
    try {
      const { data } = await axios.get(`${env.baseUrl}${Api.bookmarks}/${id}`);
      setCurrentBookmark(data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const addToBookmarksList = async (newBookmark: IBookmarkedHotels) => {
    setIsLoading(true);
    try {
      const { data } = await axios({
        method: "post",
        url: `${env.baseUrl}${Api.bookmarks}`,
        data: newBookmark,
      });
      setBookmarksList((perviousData) => [...perviousData, data]);
    } catch (error) {
      toast.error((error as AxiosError).message);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteBookmark = async (id: number) => {
    setIsLoading(true);
    try {
      const { status } = await axios({
        method: "delete",
        url: `${env.baseUrl}${Api.bookmarks}${id}`,
      });
      setBookmarksList((perviousData) =>
        perviousData.filter((item) => item.id !== id)
      );
      if (status === Keys.SuccessStatus) {
        toast.success("Item deleted successfully");
      }
    } catch (error) {
      toast.error((error as AxiosError).message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <BookmarksContext.Provider
      value={{
        isLoading,
        bookmark: addToBookmarksList,
        bookmarkList: bookmarksList ?? [],
        currentBookmark,
        deleteBookmark,
        getBookmarks,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};
export const useBookmarks = () => {
  return useContext(BookmarksContext);
};
export default BookmarksListProvider;
