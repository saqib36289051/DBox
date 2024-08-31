import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "./config";
import * as SecureStore from "expo-secure-store";
import { getData, storeData } from "@/utils/utils";

const refreshAuthToken = async () => {
  const refreshToken = await getData("userInfo");
  const response = await fetch(`${baseURL}/token/refresh/`, {
    method: "POST",
    body: JSON.stringify({ refresh: refreshToken?.refresh }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    // Handle the case where refresh token is also invalid
    throw new Error("Unable to refresh token");
  }
  const data = await response.json();
  const updatedToken = {
    ...refreshToken,
    access: data.access,
  };
  await storeData("userInfo", updatedToken);
  return data?.access;
};

// Custom base query
const customBaseQuery = (baseUrl) => {
  const baseQuery = fetchBaseQuery({ baseUrl });

  return async (args, api, extraOptions) => {
    console.log(
      "🚀 ~ return ~ args, api, extraOptions:",
      JSON.stringify({ args, api, extraOptions }, null, 2)
    );
    const token = await getData("userInfo").then((data) => data?.access);
    if (token) {
      args.headers = {
        ...args.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      try {
        const newToken = await refreshAuthToken();
        args.headers.set("Authorization", `Bearer ${newToken}`);
        result = await baseQuery(args, api, extraOptions);
      } catch (refreshError) {
        return { error: { status: 401, data: "Unauthorized" } };
      }
    }

    if (result.data instanceof Blob) {
      return { data: result.data };
    }

    if (
      result?.data &&
      result?.data?.type &&
      result?.data?.type !== "application/json"
    ) {
      return { data: result.data };
    }

    return result;
  };
};

export default customBaseQuery;
