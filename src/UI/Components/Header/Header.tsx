import { format } from "date-fns";
import { MouseEvent, useRef, useState } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import toast from "react-hot-toast";
import { HiCalendar, HiSearch } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { toggleState } from "../../../Service/Functions";
import { Keys } from "../../../env/Enums/Keys";
import useOutsideClick from "../../hooks/useOutsideClick";
import IsVisible from "../Shared/IsVisible";
import GuestOptions from "./GuestOptions";
const Header = () => {
  const [searchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [isGuestOptionsOpen, setIsGuestOptionsOpen] = useState(false);
  const [roomOptionsCount, setRoomOptionsCount] = useState<{
    [key: string]: number;
  }>({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: Keys.TravelDateRange,
    },
  ]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

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
  const datePickerRef = useRef(null);
  useOutsideClick(
    datePickerRef,
    () => {
      setIsDatePickerOpen(false);
    },
    "datePickerParent"
  );
  const navigate = useNavigate();

  const onSearch = () => {
    if (!destination) {
      toast.error("Please enter a destination");
      return;
    }
    const jsonParams = createSearchParams({
      date: JSON.stringify(date),
      options: JSON.stringify(roomOptionsCount),
      destination,
    });
    navigate({ pathname: "/hotels", search: jsonParams.toString() });
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

        <div
          className="headerSearchItem"
          ref={datePickerRef}
          id="datePickerParent"
        >
          <HiCalendar className="headerIcon dateIcon" />
          <button onClick={() => toggleState(setIsDatePickerOpen)}>
            <div className="dateDropDown">{`${format(
              date[0].startDate ?? new Date(),
              "MM/dd/yyy"
            )} to ${format(
              date[0].startDate ?? new Date(),
              "MM/dd/yyy"
            )}`}</div>
          </button>

          <IsVisible isVisible={isDatePickerOpen}>
            <DateRange
              onChange={(item: RangeKeyDict) => {
                setDate([item[Keys.TravelDateRange]]);
              }}
              ranges={date}
              className="date"
              minDate={new Date()}
              moveRangeOnFirstSelection
            />
          </IsVisible>
          <span className="separator"></span>
        </div>
        <div className="headerSearchItem">
          <button onClick={() => toggleState(setIsGuestOptionsOpen)}>
            <div id="optionDropDown">
              {roomOptionsCount.adult} adult &bull; {roomOptionsCount.children}{" "}
              children &bull; {roomOptionsCount.room} room
            </div>
          </button>
          <GuestOptions
            isGuestOptionsOpen={isGuestOptionsOpen}
            onOptionChange={onOptionChange}
            roomOptionsCount={roomOptionsCount}
            closerFunction={() => setIsGuestOptionsOpen(false)}
          />
          <span className="separator" />
        </div>
        <div className="headerSearchItem">
          <button
            className="headerSearchBtn"
            onClick={onSearch}
          >
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Header;
