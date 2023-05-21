import { useState, useRef, useEffect } from "react";
import "../css/map.css";
import logo from "../logos/logo_1.svg";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import fetcher from "../lib/fetcher";

const MapContainer = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pins, setPins] = useState([]);
  const [showPinInputs, setShowPinInputs] = useState(false);
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  useEffect(() => {
    getPins();
  }, []);

  console.log(pins);

  const mapRef = useRef(null);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getPins = async () => {
    try {
      const pins = await fetcher("/pins");
      if (Array.isArray(pins)) {
        setPins(pins);
      } else {
        console.error("قيمة pins غير صالحة:", pins);
      }
    } catch (error) {
      console.error("حدث خطأ أثناء استرجاع البيانات:", error);
    }
  };

  const search = () => {
    const { google } = props;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
        const location = results[0].geometry.location;
        mapRef.current.panTo(location);
      }
    });
  };

  const togglePinInputs = () => {
    setShowPinInputs(!showPinInputs);
  };

  const addPin = async () => {
    const newPin = {
      username: username,
      title: title,
      desc: desc,
      long: long,
      lat: lat
     
    };

    try {
      const response = await fetcher("/pins", {
        method: "POST",
        body: JSON.stringify(newPin),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // تحقق من نجاح إضافة البين وقم بإعادة تعيين الحالات
      if (response.status === 200) {
        setUsername("");
        setTitle("");
        setDesc("");
        setLat("");
        setLong("");
        getPins(); // لتحديث الـ Pins بعد الإضافة
      }
    } catch (error) {
      console.error("حدث خطأ أثناء إضافة البين:", error);
    }
  };

  return (
    <div>
      <div className="header">
        <div className="container">
          <div className="nav-left">
            <div className="img-logo">
              <a href="./">
                <img decoding="async" className="logo" src={logo} alt="" />
              </a>
            </div>
            <div className="left-link">
              <a href="./map">Map</a>
              <a href="./favorite">Favorite</a>
            </div>
          </div>
          <div className="nav-right">
            <div className="right-link">
              <a href="./logout">LogOut</a>
            </div>
          </div>
        </div>
      </div>
      <div className="search-box">
        <input
          className="search-input"
          type="text"
          placeholder="Search for places"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit" className="search-btn" onClick={search}>
          Search
        </button>
      </div>
      <div className="pin-input">
        {showPinInputs && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <input
              type="number"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
            <input
              type="number"
              placeholder="Longitude"
              value={long}
              onChange={(e) => setLong(e.target.value)}
            />
            <button className="add-pin-btn" onClick={addPin}>
              Add Pin
            </button>
          </>
        )}
      </div>
      <div className="map-container">
        <button className="toggle-pin-btn" onClick={togglePinInputs}>
          {showPinInputs ? "Hide Pin Inputs" : "Show Pin Inputs"}
        </button>
        <Map
          style={{ marginLeft: "-20px", marginTop: "20px" }}
          google={props.google}
          zoom={14}
          initialCenter={{ lat: 31.5017, lng: 34.4668 }}
          onReady={(mapProps, map) => {
            mapRef.current = map;
          }}
        >
          {pins.map((pin) => {
            return (
              <Marker
                title={"The marker's title will appear as a tooltip."}
                name={"SOMA"}
                position={{ lat: pin.lat, lng: pin.long }}
              />
            );
          })}
        </Map>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyB4nJ_35oFFm0vh6dBeXdncZfWc7Jouhwc&libraries=places",
  libraries: ["places"],
})(MapContainer);
