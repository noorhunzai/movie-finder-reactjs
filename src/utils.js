export const fetchMovie = async (id) => {
  const response = await fetch(`https://www.omdbapi.com/?apikey=f8586019&i=${id}`);
  const data = await response.json();
  if (data.Error) {
    throw new Error(data.Error);
  }
  return data;
};