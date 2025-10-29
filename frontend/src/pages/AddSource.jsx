import { useState } from "react";
import { WaterSourceAPI } from "../lib/api";

export default function AddSource() {
  const [form, setForm] = useState({
    name: "",
    location: "", // human-readable location/description
    latitude: "",
    longitude: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Build payload to match backend schema (location object with numeric coords)
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

      const res = await WaterSourceAPI.create(payload);
      alert("✅ Water source added successfully!");
      setForm({ name: "", location: "", latitude: "", longitude: "" });
    } catch (err) {
      console.error("Error adding water source:", err);
      // Try to show a helpful message from the server if available
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
