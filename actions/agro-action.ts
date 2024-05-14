// import { NextApiRequest, NextApiResponse } from "next";

import { AssetRequest, AssetResponse } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL_AGRO;

export const getAllAgroData = async () => {
  try {
    const response = await fetch(`${API_URL}api/scoringData`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const getFainc = async () => {
  try {
    const response = await fetch(`${API_URL}api/scoringData`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const rawData = await response.json();
    const filteredData = rawData.filter(
      (item) => item.scoringDataType === "ANNUALFARMINCOME"
    );
    return filteredData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const getFtainc = async () => {
  try {
    const response = await fetch(`${API_URL}api/scoringData`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const rawData = await response.json();
    const filteredData = rawData.filter(
      (item) => item.scoringDataType === "ANNUALFURTUFARMINCOME"
    );
    return filteredData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
export const getFtaninc = async () => {
  try {
    const response = await fetch(`${API_URL}api/scoringData`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const rawData = await response.json();
    const filteredData = rawData.filter(
      (item) => item.scoringDataType === "ANNUALNONFARMINCOME"
    );
    return filteredData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const createScoringData = async (
  values: AssetRequest
): Promise<AssetResponse> => {
  try {
    const res = await fetch(`${API_URL}api/scoringData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      // Handle errors here
      const errorMessage = await res.text();
      throw new Error(errorMessage);
    }

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error creating data:", error);
    throw error; // Re-throw the error for further handling
  }
};

export const editScoringData = async (
  values: AssetRequest,
  id: number
): Promise<AssetResponse> => {
  try {
    const res = await fetch(`${API_URL}api/scoringData/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deleteScoringData = async (id: number): Promise<void> => {
  try {
    const res = await fetch(`${API_URL}api/scoringData/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      return;
    } else {
      const errorMessage = await res.text();
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
