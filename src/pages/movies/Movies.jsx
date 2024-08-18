import React, { useEffect, useState } from "react";
import MovieItem from "../../components/Movies/MovieItem/MovieItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../../redux/slices/movieSlice/movieSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/General/Spinner/Spinner";

const Movies = () => {
  const { movies, isLoading, isError, isSuccess } = useSelector(
    (state) => state.movie
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("alfabetik");
  const [search, setSearch] = useState("");

  const getCategories = () => {
    const allCategories = [];
    movies.forEach((movie) => {
      allCategories.push(...movie.category);
    });
    const uniqueCategories = [...new Set(allCategories)];
    setCategories(uniqueCategories);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const sortMovies = (finalMovies) => {
    if (selectedCategory === "alfabetik") {
      return finalMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      return finalMovies.filter((movie) =>
        movie.category.includes(selectedCategory)
      );
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(search.toLowerCase());
  });

  const finalMovies = sortMovies(filteredMovies);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getAllMovies());
  }, [dispatch, user, navigate]);

  

  useEffect(() => {
    if (isSuccess) {
      getCategories();
    }
    
  }, [isSuccess,isLoading,movies]);
  if(isLoading) {
    return <Spinner/>
    }

  return (
    <div className="moviesGrid d-flex flex-column p-5 border m-5">
      <h1>All Movies</h1>
      <div className="moviesListTop d-flex w-100 gap-5">
        <div className="searchMovie w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Search Movie"
            onChange={handleSearch}
            value={search}
          />
        </div>
        <div className="sortMovies w-50">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleCategoryChange}
          >
            <option value="alfabetik">Alfabetik</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        {finalMovies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
