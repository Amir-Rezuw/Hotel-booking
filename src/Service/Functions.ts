import { Dispatch, SetStateAction } from "react";
import { NavigateOptions, To, useNavigate } from "react-router-dom";

export const toggleState = (
  setterFunction: Dispatch<SetStateAction<boolean>>
) => {
  setterFunction((perviousValue) => !perviousValue);
};
export const pushUser = (to: string | To, options?: NavigateOptions) => {
  const navigate = useNavigate();
  navigate(to, options);
};
