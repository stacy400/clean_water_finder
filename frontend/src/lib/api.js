import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const WaterSourceAPI = {
  list: async () => {
    const res = await client.get("/api/water-sources");
    return res.data;
  },

  create: async (payload) => {
    const res = await client.post("/api/water-sources", payload);
    return res.data;
  },
};
