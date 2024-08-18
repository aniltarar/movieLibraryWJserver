import axios from "axios";

export const getAllMoviesService = async () => {
    const response = await axios.get("http://localhost:3000/movies");
    return response.data;
}

export const addNewMovieService = async (newMovie) => {
    const response = await axios.post("http://localhost:3000/movies", newMovie);
    return response.data;
}