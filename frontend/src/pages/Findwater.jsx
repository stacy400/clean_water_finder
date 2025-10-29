import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Component to handle map view updates
function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  return null;
}

export default function FindWater() {
  const navigate = useNavigate();
  const [sources, setSources] = useState([]);
  const [selectedSource, setSelectedSource] = useState(null);

  // Memoize the map center to prevent unnecessary re-renders
  const mapCenter = useMemo(() => {
    if (selectedSource?.location) {
      return [selectedSource.location.latitude, selectedSource.location.longitude];
    }
    return [0, 0]; // Default center if no source selected
  }, [selectedSource]);

  // Build Google Maps directions URL
  const getDirectionsUrl = (originLat, originLng, destLat, destLng) =>
    `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=driving`;

  const handleGetDirections = (location) => {
    if (!location || location.latitude == null || location.longitude == null) {
      alert('Coordinates not available for this water source.');
      return;
    }

    // If geolocation is supported, attempt to get user's current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const originLat = pos.coords.latitude;
          const originLng = pos.coords.longitude;
          const url = getDirectionsUrl(originLat, originLng, location.latitude, location.longitude);
          window.open(url, '_blank');
        },
        (err) => {
          // On error or permission denied, open directions with destination only
          const url = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
          window.open(url, '_blank');
        },
        { timeout: 5000 }
      );
    } else {
      // Fallback: open directions with destination only
      const url = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
      window.open(url, '_blank');
    }
  };

  // Fetch water sources from backend
  useEffect(() => {
    async function fetchSources() {
      try {
        const response = await axios.get("http://localhost:5000/api/water-sources");
        setSources(response.data);
      } catch (error) {
        console.error("Error fetching sources:", error);
      }
    }
    fetchSources();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">Available Water Sources</h1>

      {/* Show list of sources */}
      {!selectedSource ? (
        <div className="grid gap-4">
          {sources.length === 0 ? (
            <p className="text-gray-500 text-center">No water sources available.</p>
          ) : (
            sources.map((src) => (
              <div
                key={src._id}
                className="p-4 border rounded-lg shadow hover:bg-blue-50 cursor-pointer"
                onClick={() => setSelectedSource(src)}
              >
                <h2 className="font-semibold text-lg">{src.name}</h2>
                <p>
                  {src.description
                    ? src.description
                    : `${src.location?.latitude ?? "?"}, ${src.location?.longitude ?? "?"}`}
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleGetDirections(src.location); }}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Get Directions
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/waterSource/${src._id}`); }}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedSource(null)}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ← Back
          </button>

          {/* Map display */}
          <div className="h-[70vh] w-full rounded-xl overflow-hidden shadow-lg">
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <MapController 
                center={[selectedSource.location?.latitude, selectedSource.location?.longitude]} 
              />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[selectedSource.location?.latitude || 0, selectedSource.location?.longitude || 0]}>
                <Popup>
                  <h2 className="font-semibold">{selectedSource.name}</h2>
                  <p>
                    {selectedSource.description
                      ? selectedSource.description
                      : `${selectedSource.location?.latitude ?? "?"}, ${selectedSource.location?.longitude ?? "?"}`}
                  </p>
                  <div className="mt-2">
                    <button
                      onClick={() => handleGetDirections(selectedSource.location)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Get Directions
                    </button>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
}
