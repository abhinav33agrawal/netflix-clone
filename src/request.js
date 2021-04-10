const API_KEY = "1d09607d5c2474ca13a71509177f73b7";
const requests = {
  fetchTrending: "/trending/all/week?api_key=" + API_KEY + "&language=en-US",

  fetchNetflixOriginals:
    "/discover/tv?api_key=" + API_KEY + "&with_networks-213",
  fetchTopRated: "/movie/top_rated?api_key=" + API_KEY + "&language=en-US",
  fetchRomancellovies:
    "/discover/movie/?api_key=" + API_KEY + "&with_genres=10749",
  fetchActionMovies: "/discover/movie?api_key=" + API_KEY + "&with_genres=28",
  fetchComedyMovies: "/discover/movie?api_key=" + API_KEY + "&with_genres=35",
  fetchHorrorMovies: "/discover/movie?api_key=" + API_KEY + "&with_genres=27",
  fetchDocumentaries: "/discover/movie?api_key=" + API_KEY + "&with_genres=99",
};

export default requests;
