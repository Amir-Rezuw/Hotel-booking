import { MouseEvent, useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import OptionItem from "./OptionItem";

const GuestOptions = ({
  isGuestOptionsOpen,
  onOptionChange,
  roomOptionsCount,
  closerFunction,
}: {
  isGuestOptionsOpen: boolean;
  onOptionChange: (e: MouseEvent) => void;
  closerFunction: () => void;
  roomOptionsCount: { [key: string]: number };
}) => {
  const optionRef = useRef(null);
  useOutsideClick(optionRef, closerFunction, "optionDropDown");
  return (
    <div
      ref={optionRef}
      className="guestOptions"
      hidden={!isGuestOptionsOpen}
    >
      <OptionItem
        onChangeValue={onOptionChange}
        currentCount={roomOptionsCount.adult}
        title="Adult"
        minimumCount={1}
      />
      <OptionItem
        onChangeValue={onOptionChange}
        currentCount={roomOptionsCount.children}
        title="Children"
        minimumCount={0}
      />
      <OptionItem
        onChangeValue={onOptionChange}
        currentCount={roomOptionsCount.room}
        title="Room"
        minimumCount={1}
      />
    </div>
  );
};
export default GuestOptions;
