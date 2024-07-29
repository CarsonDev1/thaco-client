import { axiosInstance } from "@/lib/axiosInstance";

export async function getMe() {
  try {
    const response = await axiosInstance.get('/api/auth/me');
    return response.data;
  } catch (error) {
    console.error('Error in getMe function:', error);
    return Promise.reject(error);
  }
}
