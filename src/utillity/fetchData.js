export const fetchData = async (URL) => {
  const response = await fetch(URL, {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_EXERCISE_DB_RAPIDAPI_KEY,
      "x-rapidapi-host": "exercisedb.p.rapidapi.com",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("API Error:", errorData);
    throw new Error(errorData.message || "Failed to fetch data");
  }

  return await response.json();
};