import { MouseEvent, useState } from "react";
import { HiCalendar, HiSearch } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import { toggleState } from "../../Service/Functions";
const Header = () => {
  const [destination, setDestination] = useState("");
  const [isGuestOptions, setIsGuestOptions] = useState(false);
  const [roomOptionsCount, setRoomOptionsCount] = useState<{
    [key: string]: number;
  }>({
    adult: 1,
    children: 0,
    room: 1,
  });
  const onOptionChange = (e: MouseEvent) => {
    const name = (e.target as HTMLButtonElement).name.toLocaleLowerCase();
    const operation = (e.target as HTMLButtonElement).innerText;

    setRoomOptionsCount((perviousValues) => {
      return operation === "+"
        ? {
            ...perviousValues,
            [name]: perviousValues[name] + 1,
          }
        : { ...perviousValues, [name]: perviousValues[name] - 1 };
    });
  };
  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon" />
          <input
            value={destination}
            onChange={(e) =>
              setDestination((e.target as HTMLInputElement).value)
            }
            type="text"
            placeholder="Where to go?"
            className="headerSearchInput"
            id="destination"
            name="destination"
          />
          <span className="separator"></span>
        </div>

        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />

          <div className="dateDropDown">2023/06/23</div>
          <span className="separator"></span>
        </div>
        <div className="headerSearchItem">
          <button onClick={() => toggleState(setIsGuestOptions)}>
            <div id="optionDropDown">
              {roomOptionsCount.adult} adult &bull; {roomOptionsCount.children}{" "}
              children &bull; {roomOptionsCount.room} room
            </div>
          </button>
          <div
            className="guestOptions"
            hidden={!isGuestOptions}
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
          <span className="separator" />
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
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
