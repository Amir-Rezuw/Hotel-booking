import axios from "axios";
import { ReactNode, createContext, useContext, useState } from "react";
import { IBookmarkedHotels } from "../../Types/IBookmarkedHotels";
import { Api } from "../../env/Api";
import { env } from "../../env/env";
import useHttpRequest from "../hooks/useHttpRequest";
interface IBookmarkCtx {
  bookmarkList: IBookmarkedHotels[];
  bookmark: () => void;
  isLoading: boolean;
  getBookmarks: ({ id }: { id: string }) => void;
  currentBookmark: IBookmarkedHotels | null;
  isFetchingBookmarks: boolean;
}
const BookmarksContext = createContext<IBookmarkCtx>({
  bookmarkList: [],
  bookmark: () => {},
  isLoading: false,
  getBookmarks: () => {},
  currentBookmark: null,
  isFetchingBookmarks: false,
});
const BookmarksListProvider = ({ children }: { children: ReactNode }) => {
  const [currentBookmark, setCurrentBookmark] =
    useState<IBookmarkedHotels | null>(null);
  const [isFetchingBookmarks, setIsFetchingBookmarks] = useState(false);
  const { data: bookmarksList, isLoading } = useHttpRequest<
    IBookmarkedHotels[]
  >(`${env.baseUtl}${Api.bookmarks}`);
  const addToBookmarksList = () => {};
  const getBookmarks = async ({ id }: { id: string }) => {
    setIsFetchingBookmarks(true);
    setCurrentBookmark(null);
    try {
      const { data } = await axios.get(`${env.baseUtl}${Api.bookmarks}/${id}`);
      setCurrentBookmark(data);
    } catch (error) {
    } finally {
      setIsFetchingBookmarks(false);
    }
  };
  return (
    <BookmarksContext.Provider
      value={{
        isLoading,
        bookmark: addToBookmarksList,
        bookmarkList: bookmarksList ?? [],
        getBookmarks,
        currentBookmark,
        isFetchingBookmarks,
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
