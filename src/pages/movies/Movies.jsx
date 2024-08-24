import React, { useEffect, useState } from "react";
import MovieItem from "../../components/Movies/MovieItem/MovieItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../../redux/slices/movieSlice/movieSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/General/Spinner/Spinner";
import { Pagination, Row, Col, Form, Button } from "react-bootstrap";

const Movies = () => {
  const { movies, isLoading, isSuccess } = useSelector((state) => state.movie);
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = finalMovies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(finalMovies.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    <div className="moviesGrid  p-5 border m-5">
      <h1>Tüm Filmler</h1>
      <Row className="moviesListTop w-100 gap-3 mb-5">
        <Col xs={12} >
          <Form.Control
            type="text"
            placeholder="Film Ara..."
            onChange={handleSearch}
            value={search}
            className="p-3"
          />
        </Col>
        <Col xs={12} sm={12} >
          <Form.Select
            aria-label="Default select example"
            onChange={handleCategoryChange}
            className="p-3"
          >
            <option value="alfabetik">Alfabetik Diziliş</option>
            <option value="rate">Puan'a Göre Sırala</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={12} sm={12}>
          <Button className="w-100" variant="outline-dark" size="lg" onClick={refreshMovies}>
            Yenile
          </Button>
        </Col>
      </Row>
      <div className="d-flex flex-column justify-content-center align-items-center">
        {currentItems.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="pagination d-flex justify-content-center gap-3">
        <Pagination size="lg">
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
