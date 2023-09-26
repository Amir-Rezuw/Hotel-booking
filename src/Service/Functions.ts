import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const toggleState = (
  setterFunction: Dispatch<SetStateAction<boolean>>
) => {
  setterFunction((perviousValue) => !perviousValue);
};
export const downCaster = <T>(value: any): T => {
  return value as T;
};
export const inputChangeHandler = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setterFunction: Dispatch<SetStateAction<string>>
) => {
  setterFunction(e.target.value);
};
