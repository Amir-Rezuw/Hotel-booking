import axios, { AxiosError } from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import toast from "react-hot-toast";
import { IBookmarkedHotels } from "../../Types/IBookmarkedHotels";
import { Api } from "../../env/Api";
import { BookmarkReducerActions, Keys } from "../../env/Enums/Keys";
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
interface IReducerState {
  bookmarksList: IBookmarkedHotels[];
  isLoading: boolean;
  currentBookmark: IBookmarkedHotels | null;
}
const initialState: IReducerState = {
  bookmarksList: [],
  isLoading: false,
  currentBookmark: null,
};
const bookmarkReducer = <T,>(
  state: IReducerState,
  actions: {
    type: BookmarkReducerActions;
    payload?: T;
  }
) => {
  switch (actions.type) {
    case BookmarkReducerActions.Loading:
      return { ...state, isLoading: true };
    case BookmarkReducerActions.Bookmarks_List_Loaded:
      return {
        ...state,
        isLoading: false,
        bookmarksList: (actions?.payload as IBookmarkedHotels[]) ?? [],
      };
    case BookmarkReducerActions.Rejected:
      return { ...state, isLoading: false };
    case BookmarkReducerActions.Single_Bookmark_Loaded:
      return {
        ...state,
        isLoading: false,
        currentBookmark: (actions.payload as IBookmarkedHotels) ?? null,
      };
    case BookmarkReducerActions.Bookmark_Created:
      return {
        ...state,
        isLoading: false,
        bookmarksList: [
          ...state.bookmarksList,
          actions.payload as IBookmarkedHotels,
        ],
      };
    case BookmarkReducerActions.Bookmark_Deleted:
      return {
        ...state,
        isLoading: false,
        bookmarksList: state.bookmarksList.filter(
          (item) => item.id !== actions.payload
        ),
        currentBookmark: null,
      };
    default:
      return state;
  }
};
const BookmarksListProvider = ({ children }: { children: ReactNode }) => {
  const [{ bookmarksList, currentBookmark, isLoading }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );

  useEffect(() => {
    const getBookmarkList = async () => {
      dispatch({ type: BookmarkReducerActions.Loading });
      try {
        const { data } = await axios.get(`${env.baseUrl}${Api.bookmarks}`);
        dispatch({
          type: BookmarkReducerActions.Bookmarks_List_Loaded,
          payload: data,
        });
      } catch (error) {
        dispatch({ type: BookmarkReducerActions.Rejected });
        toast.error((error as AxiosError).message);
      }
    };
    getBookmarkList();
  }, []);
  const getBookmarks = async ({ id }: { id: string }) => {
    if (`${currentBookmark?.id}` === id) return;
    dispatch({ type: BookmarkReducerActions.Loading });
    dispatch({
      type: BookmarkReducerActions.Single_Bookmark_Loaded,
      payload: null,
    });
    try {
      const { data } = await axios.get(`${env.baseUrl}${Api.bookmarks}/${id}`);
      dispatch({
        type: BookmarkReducerActions.Single_Bookmark_Loaded,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: BookmarkReducerActions.Rejected });
      toast.error((error as AxiosError).message);
    }
  };
  const addToBookmarksList = async (newBookmark: IBookmarkedHotels) => {
    dispatch({ type: BookmarkReducerActions.Loading });
    try {
      const { data } = await axios({
        method: "post",
        url: `${env.baseUrl}${Api.bookmarks}`,
        data: newBookmark,
      });
      dispatch({
        type: BookmarkReducerActions.Single_Bookmark_Loaded,
        payload: data,
      });
      dispatch({
        type: BookmarkReducerActions.Bookmark_Created,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: BookmarkReducerActions.Rejected });
      toast.error((error as AxiosError).message);
    }
  };
  const deleteBookmark = async (id: number) => {
    dispatch({ type: BookmarkReducerActions.Loading });
    try {
      const { status } = await axios({
        method: "delete",
        url: `${env.baseUrl}${Api.bookmarks}${id}`,
      });

      dispatch({
        type: BookmarkReducerActions.Bookmark_Deleted,
        payload: id,
      });
      if (status === Keys.SuccessStatus) {
        toast.success("Item deleted successfully");
      }
    } catch (error) {
      dispatch({ type: BookmarkReducerActions.Rejected });
      toast.error((error as AxiosError).message);
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
