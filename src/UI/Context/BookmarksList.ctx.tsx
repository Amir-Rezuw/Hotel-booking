import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IBookmarkedHotels } from "../../Types/IBookmarkedHotels";
import { Api } from "../../env/Api";
import { env } from "../../env/env";

interface IBookmarkCtx {
  bookmarkList: IBookmarkedHotels[];
  bookmark: (newBookmark: IBookmarkedHotels) => void;
  isLoading: boolean;
  getBookmarks: ({ id }: { id: string }) => void;
  currentBookmark: IBookmarkedHotels | null;
}
const BookmarksContext = createContext<IBookmarkCtx>({
  bookmarkList: [],
  bookmark: () => {},
  isLoading: false,
  getBookmarks: ({}) => {},
  currentBookmark: null,
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
    const { data } = await axios({
      method: "post",
      url: `${env.baseUrl}${Api.bookmarks}`,
      data: newBookmark,
    });
    setBookmarksList((perviousData) => [...perviousData, data]);
  };

  return (
    <BookmarksContext.Provider
      value={{
        isLoading,
        bookmark: addToBookmarksList,
        bookmarkList: bookmarksList ?? [],
        currentBookmark,

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
