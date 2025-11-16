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
  const [customer, setCustomer] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('customer')) || null;
    } catch (e) {
      return null;
    }
  });
  const [customerForm, setCustomerForm] = useState({ name: '', deliveryAddress: '' });

  // // Get logged-in user ID from localStorage
  // const userId = localStorage.getItem("userId");

  // Memoize the map center
  const mapCenter = useMemo(() => {
    if (selectedSource?.location) {
      return [selectedSource.location.latitude, selectedSource.location.longitude];
    }
    return [0, 0];
  }, [selectedSource]);

  // Google Maps directions
  const getDirectionsUrl = (originLat, originLng, destLat, destLng) =>
    `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=driving`;

  const handleGetDirections = (location) => {
    if (!location || location.latitude == null || location.longitude == null) {
      alert("Coordinates not available for this water source.");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const originLat = pos.coords.latitude;
          const originLng = pos.coords.longitude;

          const url = getDirectionsUrl(
            originLat,
            originLng,
            location.latitude,
            location.longitude
          );
          window.open(url, "_blank");
        },
        () => {
          const fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
          window.open(fallbackUrl, "_blank");
        },
        { timeout: 5000 }
      );
    }
  };

  // 🟦 ORDER WATER FUNCTION (uses customer info instead of login)
  const handleOrder = async (source) => {
    if (!customer) {
      alert('Please provide delivery details first.');
      return;
    }

    const quantityStr = prompt(`Enter quantity in litres for ${source.name}:`);
    const quantity = quantityStr ? Number(quantityStr) : 0;
    if (!quantity || quantity <= 0) return;

    const deliveryAddress = customer.deliveryAddress;
    const totalPrice = (source.pricePerLitre || 0) * quantity;

    // Store order locally for now
    const existing = JSON.parse(localStorage.getItem('orders') || '[]');
    existing.push({
      id: Date.now(),
      customerName: customer.name,
      deliveryAddress,
      waterSource: source._id,
      sourceName: source.name,
      quantityLitres: quantity,
      totalPrice,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('orders', JSON.stringify(existing));

    alert(`Order placed! Total cost: KES ${100}. Till number: 23456`);
  };

  // Fetch water sources
  useEffect(() => {
    async function fetchSources() {
      try {
        const res = await axios.get(
          "https://clean-water-finder-3.onrender.com/api/water-sources"
        );
        setSources(res.data);
      } catch (error) {
        console.error("Error fetching sources:", error);
      }
    }
    fetchSources();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">Available Water Sources</h1>

      {/* If customer details not provided, show simple delivery form instead of listing */}
      {!customer && (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Before you continue, enter delivery details</h2>
          <label className="block text-sm text-gray-600">Your name</label>
          <input
            value={customerForm.name}
            onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
            className="w-full p-2 border rounded mb-3"
            placeholder="Full name"
          />
          <label className="block text-sm text-gray-600">Delivery address</label>
          <input
            value={customerForm.deliveryAddress}
            onChange={(e) => setCustomerForm({ ...customerForm, deliveryAddress: e.target.value })}
            className="w-full p-2 border rounded mb-4"
            placeholder="Where should water be delivered?"
          />
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (!customerForm.name.trim() || !customerForm.deliveryAddress.trim()) {
                  alert('Please fill both fields');
                  return;
                }
                const c = { name: customerForm.name.trim(), deliveryAddress: customerForm.deliveryAddress.trim() };
                setCustomer(c);
                localStorage.setItem('customer', JSON.stringify(c));
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Continue
            </button>
            <button
              onClick={() => { setCustomerForm({ name: '', deliveryAddress: '' }); }}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* List view */}
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

                <p className="font-semibold text-blue-600 mt-2">
                  Price: KES {src.pricePerLitre} / litre
                </p>

                <div className="mt-2 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGetDirections(src.location);
                    }}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Get Directions
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSource(src);
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    View Details
                  </button>

                  {/* ORDER BUTTON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrder(src);
                    }}
                    className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        // Map View
        <div>
          <button
            onClick={() => setSelectedSource(null)}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ← Back
          </button>

          <div className="h-[70vh] w-full rounded-xl overflow-hidden shadow-lg">
            <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
              <MapController center={[selectedSource.location?.latitude, selectedSource.location?.longitude]} />

              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker
                position={[
                  selectedSource.location?.latitude || 0,
                  selectedSource.location?.longitude || 0,
                ]}
              >
                <Popup>
                  <h2 className="font-semibold">{selectedSource.name}</h2>
                  <p>
                    {selectedSource.description
                      ? selectedSource.description
                      : `${selectedSource.location?.latitude}, ${selectedSource.location?.longitude}`}
                  </p>

                  <p className="font-semibold mt-2">
                    Price: KES {selectedSource.pricePerLitre} / litre
                  </p>

                  <p className="mt-2 font-medium">Till number: <span className="font-bold">23456</span></p>

                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleGetDirections(selectedSource.location)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Get Directions
                    </button>

                    <button
                      onClick={() => handleOrder(selectedSource)}
                      className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                    >
                      Order Now
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

