import {
  AccountRequest,
  AccountResponse,
  Request,
  Response,
  SocialRequest,
  SocialResponse,
} from "@/types/types";

export type RequestType = SocialRequest | AccountRequest;
export type ResponseType = SocialResponse | AccountResponse;

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL_AGRO;
type Endpoint = string;

export const createData = async (
  endpoint: Endpoint,
  values: RequestType
): Promise<ResponseType> => {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
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
    throw error;
  }
};

export const getAll = async (endpoint: Endpoint) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
export const getAccountDurationById = async (
  endpoint: Endpoint
): Promise<AccountResponse[]> => {
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

export const create = async (
  endpoint: Endpoint,
  values: Request
): Promise<Response> => {
  try {
    const { minBalanceThreshold, ...rest } = values;
    const dataToSend = {
      ...rest,
      minBalanceThreshold:
        endpoint === "api/assets" ? minBalanceThreshold : undefined,
    };

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
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
    throw error;
  }
};

export const edit = async (
  endpoint: Endpoint,
  values: Request
): Promise<Response> => {
  try {
    const { minBalanceThreshold, ...rest } = values;
    const dataToSend = {
      ...rest,
      minBalanceThreshold:
        endpoint === "api/assets" ? minBalanceThreshold : undefined,
    };

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const editData = async (
  endpoint: Endpoint,
  values: RequestType
): Promise<ResponseType> => {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
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

export const deleteWithId = async (endpoint: Endpoint): Promise<void> => {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
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
