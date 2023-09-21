import { Dispatch, SetStateAction } from "react";

export const toggleState = (
  setterFunction: Dispatch<SetStateAction<boolean>>
) => {
  setterFunction((perviousValue) => !perviousValue);
};
export const downCaster = <T>(value: any): T => {
  return value as T;
};
