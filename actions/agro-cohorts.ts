import { AgroCohortResponse } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL_AGRO;
type Endpoint = string;

export const getAll = async (
  endpoint: Endpoint
): Promise<AgroCohortResponse[]> => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
