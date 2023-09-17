import { MouseEvent } from "react";

const OptionItem = ({
  title,
  minimumCount,
  currentCount,
  onChangeValue,
}: {
  title: string;
  minimumCount: number;
  currentCount: number;
  onChangeValue: (event: MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{title}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          disabled={currentCount === minimumCount}
          name={title}
          onClick={onChangeValue}
        >
          -
        </button>
        <span className="optionCounterNumber">{currentCount}</span>
        <button
          name={title}
          onClick={onChangeValue}
          className="optionCounterBtn"
        >
          +
        </button>
      </div>
    </div>
  );
};
export default OptionItem;
