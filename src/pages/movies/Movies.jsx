import React, { useEffect, useState } from "react";
import MovieItem from "../../components/Movies/MovieItem/MovieItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../../redux/slices/movieSlice/movieSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/General/Spinner/Spinner";
import { Pagination } from "react-bootstrap";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

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
    } else if (selectedCategory === "rate") {
      return finalMovies.sort((a, b) => b.rating - a.rating);
    } else {
      return finalMovies.filter((movie) =>
        movie.category.includes(selectedCategory)
      );
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const refreshMovies = () => {
    dispatch(getAllMovies());
  };

  const filteredMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(search.toLowerCase());
  });

  const finalMovies = sortMovies(filteredMovies);

  const indexOfLastItem = currentPage * itemsPerPage; // son filmin indexi = şuanki sayfa * her sayfadaki eleman sayısı => 20= 2*10
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // sayfadakı ilk filmin indexi = son filmin indexi - her sayfadaki eleman sayısı => 10 = 20-10
  const currentItems = finalMovies.slice(indexOfFirstItem, indexOfLastItem); // şuanki sayfadaki filmler = finalMovies.slice(10,20) => mevcut sayfadaki ilk itemden son iteme kadar olan filmleri alır
  const totalPages = Math.ceil(finalMovies.length / itemsPerPage); // toplam sayfa sayısı = finalMovies.length / her sayfadaki eleman sayısı => 2 = 20/10
  const paginate = (pageNumber) => setCurrentPage(pageNumber); // sayfa numarasını değiştirir

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
  }, [isSuccess, isLoading, movies]);
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="moviesGrid d-flex flex-column p-5 border m-5">
      <h1>All Movies</h1>
      <div className="moviesListTop d-flex w-100 gap-5 mb-5">
        <div className="searchMovie w-50">
          <input
            type="text"
            className="form-control p-3"
            placeholder="Search Movie"
            onChange={handleSearch}
            value={search}
          />
        </div>
        <div className="sortMovies w-50">
          <select
            className="form-select p-3"
            aria-label="Default select example"
            onChange={handleCategoryChange}
          >
            <option value="alfabetik">Alfabetik Diziliş</option>
            <option value="rate">Puan'a Göre Sırala</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-outline-dark btn-lg" onClick={refreshMovies}>
          Yenile
        </button>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        {currentItems.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="pagination d-flex justify-content-center gap-3">
        <Pagination size="lg" >
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
             
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
};

export default Movies;
