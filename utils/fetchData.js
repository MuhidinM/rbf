// utils/fetchData.js

export async function fetchData() {
  const endpoint = "http://10.1.177.121:8884/api/assets";
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
