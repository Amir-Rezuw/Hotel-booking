import { ReactNode, createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";
import { FAKE_USER } from "../../env/placeholders";
interface ICtxValues {
  user: null | IUserData;
  isAuthenticated: boolean;
  login: ({}: { email: string; password: string }) => void;
  logOut: () => void;
}

const AuthContext = createContext<ICtxValues>({
  isAuthenticated: false,
  login: () => {},
  logOut: () => {},
  user: null,
});
interface IReducerStates {
  user: null | IUserData;
  isAuthenticated: boolean;
}
interface IUserData {
  name: string;
  email: string;
  password: string;
}
const initialState = {
  user: null,
  isAuthenticated: false,
};
const authReducer = (
  state: IReducerStates,
  action: { type: "login" | "logout" }
) => {
  if (action.type === "login") {
    return {
      ...state,
      isAuthenticated: true,
    };
  } else if (action.type === "logout") {
    return {
      user: null,
      isAuthenticated: false,
    };
  } else {
    throw new Error("Unknown reducer action type.");
  }
};
const AuthCtxProvider = ({ children }: { children: ReactNode }) => {
  const [{ isAuthenticated, user }, dispatch] = useReducer(
    authReducer,
    initialState
  );
  const login = ({ email, password }: { email: string; password: string }) => {
    if (
      email.toLowerCase() === FAKE_USER.email.toLowerCase() &&
      password.toLowerCase() === FAKE_USER.password.toLowerCase()
    ) {
      dispatch({ type: "login" });
    } else {
      toast.error("Email or password is invalid");
    }
  };
  const logOut = () => {
    dispatch({ type: "logout" });
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthCtxProvider;
export const useAuth = () => {
  return useContext(AuthContext);
};
