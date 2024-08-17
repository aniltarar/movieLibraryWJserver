import React, { useEffect, useState } from "react";
import MovieItem from "../../components/Movies/MovieItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../../redux/slices/movieSlice/movieSlice";

const Movies = () => {
  const { movies, movie, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.movie
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovies());
  }, []);

  return (
    <>
      <div className="moviesGrid d-flex flex-column justify-content-center align-items-center">
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default Movies;
