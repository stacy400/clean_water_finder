import axios from "axios";

const API = import.meta.env.VITE_API_URL;
const client = axios.create(
    {
        baseURL: API,
        headers: {
            "Content-Type": "application/json"
        }
    }
);


// Water Sources Endpoints
export const WaterSourceAPI = {
    list: async () => {
        const res = await client.get(`/api/water-sources`);
        return res.data;
    },

    create: async (payload) => {
        const res = await client.post(`/api/water-sources`, payload);
        return res.data;
    },

    update: async (id, payload) => {
        const res = await client.put(`/api/water-sources/${id}`, payload);
        return res.data;
    },

    remove: async (id) => {
        const res = await client.delete(`/api/water-sources/${id}`);
        return res.data;
    }
};
export default WaterSourceAPI;