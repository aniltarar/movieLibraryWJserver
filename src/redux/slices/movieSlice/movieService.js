import axios from "axios";

export const getAllMoviesService = async () => {
    const response = await axios.get("http://localhost:3000/movies");
    return response.data;
}