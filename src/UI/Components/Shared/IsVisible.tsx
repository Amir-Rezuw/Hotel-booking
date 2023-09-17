import { Fragment, ReactNode } from "react";

interface IProps {
  isVisible: boolean;
  children: ReactNode;
}

const IsVisible = ({ isVisible, children }: IProps) => {
  if (!isVisible) return null;
  return <Fragment>{children}</Fragment>;
};

export default IsVisible;
