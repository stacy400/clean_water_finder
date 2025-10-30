import { useState } from "react";
import { WaterSourceAPI } from "../lib/api";

export default function AddSource() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📍 Get user location
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setForm((prev) => ({ ...prev, latitude, longitude }));
        alert(`📍 Location captured!\nLat: ${latitude}, Lng: ${longitude}`);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Failed to get location. Please enable location access.");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        location: {
          latitude: parseFloat(form.latitude),
          longitude: parseFloat(form.longitude),
        },
        description: form.location,
        status: "Available",
        quality: "Good",
      };

      await WaterSourceAPI.create(payload);
      alert("✅ Water source added successfully!");
      setForm({ name: "", location: "", latitude: "", longitude: "" });
    } catch (err) {
      console.error("Error adding water source:", err);
      const serverMessage = err?.response?.data?.error || err?.message;
      alert(`❌ Failed to add source: ${serverMessage}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Water Source</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Source Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="location"
          placeholder="Location Description"
          value={form.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-2">
          <input
            name="latitude"
            placeholder="Latitude"
            value={form.latitude}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="longitude"
            placeholder="Longitude"
            value={form.longitude}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="button"
          onClick={handleUseMyLocation}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          📍 Use My Location
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Source
        </button>
      </form>
    </div>
  );
}
