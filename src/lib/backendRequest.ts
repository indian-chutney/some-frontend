import axios from "axios";
const backend_url = "http://localhost:3000/api/v1";

export async function backendRequest(endpoint: string, token: string) {
  try {
    const res = await axios.get(`${backend_url}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    console.error("Request failed:", error?.response?.data || error.message);
    throw error;
  }
}
