import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useState, useEffect } from "react";
import { WaterSourceAPI } from "../lib/api";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon issue (important for Vite projects)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const FindWater = () => {
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch water sources from API
  useEffect(() => {
    const fetchWaterSources = async () => {
      try {
        const sources = await WaterSourceAPI.list();
        const formattedMarkers = sources.map(source => ({
          id: source._id,
          position: [source.location.latitude, source.location.longitude],
          name: source.name,
          status: source.status,
          quality: source.quality,
          description: source.description
        }));
        setMarkers(formattedMarkers);
      } catch (err) {
        setError('Failed to load water sources. Please try again later.');
        console.error('Error fetching water sources:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWaterSources();
  }, []);

  // Add marker when user clicks on the map
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const newMarker = {
          id: Date.now(),
          position: [e.latlng.lat, e.latlng.lng],
          name: "New Water Source",
        };
        setMarkers((prev) => [...prev, newMarker]);
      },
    });
    return null;
  }

  // Center map on user’s location
  function LocateUserButton() {
    const map = useMap();

    const locateUser = () => {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation([latitude, longitude]);
          map.flyTo([latitude, longitude], 13);
        },
        (err) => {
          console.error(err);
          alert("Unable to retrieve your location.");
        }
      );
    };

    return (
      <button
        onClick={locateUser}
        className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        📍 Locate Me
      </button>
    );
  }

  return (
    <div className="p-6 relative">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Find Nearby Water Sources
      </h2>
      <p className="text-gray-600 mb-3">
        Click anywhere on the map to mark a new water source 💧
      </p>

      <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={[-1.286389, 36.817223]} // Default center (Nairobi)
          zoom={8}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocateUserButton />
          <MapClickHandler />
          {markers.map((marker) => (
            <Marker key={marker.id} position={marker.position}>
              <Popup>{marker.name}</Popup>
            </Marker>
          ))}
          {userLocation && (
            <Marker position={userLocation}>
              <Popup>You are here</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default FindWater;

