import React, { useEffect } from "react";
import RowMovieItem from "../MovieItem/RowMovieItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../../../redux/slices/movieSlice/movieSlice";
import Spinner from "../../General/Spinner/Spinner";
import { useNavigate } from "react-router-dom";

const ListMyMovies = () => {
  const { movies, isLoading, isError, isSuccess } = useSelector(
    (state) => state.movie
  );

  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]); // Add user and navigate to dependency array

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const userMovies = user ? movies.filter((movie) => movie.addedBy === user.id) : [];

  return (
    <div className="d-flex flex-column w-100 align-items-center justify-content-center">
      <div className="moviesGrid w-50">
        <div className="topBar d-flex justify-content-between my-3">
          <h1>List My Movies</h1>
          <button
            className="btn btn-outline-dark btn-lg"
            onClick={() => dispatch(getAllMovies())}
          >
            Yenile
          </button>
        </div>
        {userMovies.length > 0 ? (
          userMovies.map((movie) => (
            <div key={movie.id} className="movieItem m-3">
              <RowMovieItem key={movie.id} movie={movie} />
            </div>
          ))
        ) : (
          <p>Eklenmiş Film Bulunmamaktadır.</p>
        )}
      </div>
    </div>
  );
};

export default ListMyMovies;
