import React, { useEffect } from "react";
import RowMovieItem from "../MovieItem/RowMovieItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../../../redux/slices/movieSlice/movieSlice";
import Spinner from "../../General/Spinner/Spinner";

const ListMyMovies = () => {
  const { movies, isLoading, isError, isSuccess } = useSelector(
    (state) => state.movie
  );
  

  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const userMovies = movies.filter((movie) => movie.addedBy === user.id);
  const refreshMovies = () => {
    dispatch(getAllMovies());
  };

  useEffect(() => {
    dispatch(getAllMovies());

    if (isLoading) {
      return <Spinner />;
    }
  }, [dispatch]);

  return (
    <div className="d-flex flex-column w-100 align-items-center justify-content-center">
      <div className="moviesGrid w-50">
        <div className="topBar d-flex justify-content-between my-3">
          <h1>List My Movies</h1>
          <button
            className="btn btn-outline-dark btn-lg"
            onClick={refreshMovies}
          >
            Yenile
          </button>
        </div>
        {userMovies.map((movie) => (
          <div key={movie.id} className="movieItem m-3">
            <RowMovieItem key={movie.id} movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListMyMovies;
