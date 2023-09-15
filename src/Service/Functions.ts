import { Dispatch, SetStateAction } from "react";

export const toggleState = (
  setterFunction: Dispatch<SetStateAction<boolean>>
) => {
  setterFunction((perviousValue) => !perviousValue);
};
