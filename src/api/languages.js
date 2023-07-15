import { baseUrl } from "services/base";

export const getLanguages = async () => {
  const response = await fetch(`${baseUrl}/languages`);
  return await response.json();
};
