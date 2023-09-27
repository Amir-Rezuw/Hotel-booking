import axios, { AxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { inputChangeHandler } from "../../../Service/Functions";
import { IBookmarkedHotels } from "../../../Types/IBookmarkedHotels";
import { IReversedGeoData } from "../../../Types/IReverseGeolocationData";
import { Keys } from "../../../env/Enums/Keys";
import { env } from "../../../env/env";
import { useBookmarks } from "../../Context/BookmarksList.ctx";
import useUrlLocation from "../../hooks/useUrlLocation";
import Loader from "../Shared/Loader";

const AddBookmark = () => {
  const [lat, lng] = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isDecodingLatLng, setIsDecodingLatLng] = useState(false);
  const { bookmark } = useBookmarks();
  const navigate = useNavigate();
  useEffect(() => {
    const getLocation = async () => {
      if (!lat && !lng) return;

      setIsDecodingLatLng(true);
      try {
        const { data, status } = await axios.get<IReversedGeoData>(
          `${env.GeocodingBaseUrl}?latitude=${lat}&longitude=${lng}`
        );
        if (status === Keys.SuccessStatus) {
          setCountry(data.countryName);
          setCityName(data.city);
          setCountryCode(data.countryCode);
        }
        if (!data.city) {
          toast.error("There is no city for pinned location.");
        }
      } catch (error: unknown) {
        toast.error((error as AxiosError).message);
      } finally {
        setIsDecodingLatLng(false);
      }
    };

    getLocation();
  }, [lat, lng]);
  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    const newBookmark: IBookmarkedHotels = {
      cityName,
      country,
      countryCode,
      latitude: lat ?? "0",
      longitude: lng ?? "0",
      host_location: `${cityName} ${country}`,
    };
    bookmark(newBookmark);
    navigate("/bookmarks");
  };
  if (isDecodingLatLng) return <Loader />;
  return (
    <form
      className="form"
      onSubmit={onSubmitForm}
    >
      <div className="formControl">
        <label htmlFor="city">City</label>
        <input
          value={cityName ?? ""}
          onChange={(e) => inputChangeHandler(e, setCityName)}
          type="text"
          name="city"
          id="city"
          className=""
        />
      </div>
      <div className="formControl">
        <label htmlFor="Country">Country</label>
        <input
          value={country}
          onChange={(e) => inputChangeHandler(e, setCountry)}
          type="text"
          name="Country"
          id="Country"
          className=""
        />
        <ReactCountryFlag
          className="flag"
          svg
          countryCode={countryCode}
        />
      </div>
      <div className="buttons">
        <button
          className="btn btn--back"
          onClick={(e: FormEvent) => {
            e.preventDefault();
            navigate("/bookmarks");
          }}
        >
          &larr; Back
        </button>
        <button className="btn btn--primary">Add</button>
      </div>
    </form>
  );
};

export default AddBookmark;
