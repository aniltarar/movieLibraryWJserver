import React, { useEffect, useState } from "react";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewMovie, getAllMovies } from "../../../redux/slices/movieSlice/movieSlice";
import Spinner from "../../General/Spinner/Spinner";
import { useNavigate } from "react-router-dom";

const AddNewMovies = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess } = useSelector((state) => state.movie);

  const [movieFormData, setMovieFormData] = useState({
    addedBy: userData ? userData.id : "", // Check if userData is not null
    title: "",
    image: "",
    director: "",
    scenario: "",
    description: "",
    date: "",
    rating: 0,
    category: [],
    actors: [],
  });

  const checkableCategories = [
    "Aksiyon",
    "Macera",
    "Komedi",
    "Suç",
    "Drama",
    "Fantastik",
    "Tarihi",
    "Korku",
    "Gizem",
    "Felsefi",
    "Politik",
    "Romantik",
    "Efsane",
    "Sati",
    "Bilim Kurgu",
    "Gerilim",
    "Kentsel",
    "Vahşi Batı",
  ];

  const handleChange = (e) => {
    setMovieFormData({
      ...movieFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleActorsChange = (e) => {
    const { value } = e.target;
    const actors = value.split(",");

    setMovieFormData((prevState) => ({
      ...prevState,
      actors: actors,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setMovieFormData((prevState) => ({
        ...prevState,
        category: [...prevState.category, value],
      }));
    } else {
      setMovieFormData((prevState) => ({
        ...prevState,
        category: prevState.category.filter((category) => category !== value),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData) {
      dispatch(addNewMovie(movieFormData));
      setMovieFormData({
        addedBy: userData.id,
        title: "",
        image: "",
        director: "",
        scenario: "",
        description: "",
        date: "",
        rating: 0,
        category: [],
        actors: [],
      });
    } else {
      navigate("/login"); // Redirect to login if userData is not available
    }
  };

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]); // Add userData and navigate to dependency array

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="d-flex align-items-center justify-content-center my-5">
      <div className="d-flex flex-column w-75 p-5 border shadow addMovieContainer">
        <h1>Yeni Film Ekle</h1>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Film Adı</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="title"
              placeholder="Film Adını Giriniz."
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Film Afişi</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="image"
              placeholder="Film Afiş Linkini Koyunuz."
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="director">
            <Form.Label>Yönetmen</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="director"
              placeholder="Yönetmen Adını Giriniz."
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="scenario">
            <Form.Label>Senarist</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="scenario"
              placeholder="Senarist Adını Giriniz."
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Film Özeti</Form.Label>
            <FloatingLabel
              controlId="description"
              label="Film Özetinizi Giriniz."
              className="mb-3"
            >
              <Form.Control
                style={{ minHeight: "100px", maxHeight: "500px" }}
                as="textarea"
                placeholder="Film özetinizi giriniz."
                onChange={handleChange}
                name="description"
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Yayın Tarihi</Form.Label>
            <Form.Control onChange={handleChange} type="date" name="date" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Kategoriler</Form.Label>
            <Row>
              {checkableCategories.map((categoryItem, index) => (
                <Col key={index} xs={6} sm={4} md={3}>
                  <Form.Check
                    type="checkbox"
                    label={categoryItem}
                    id={categoryItem}
                    value={categoryItem}
                    onChange={handleCategoryChange}
                    
                  />
                </Col>
              ))}
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="rating">
            <Form.Label>Puanım</Form.Label>
            <Form.Range
              max={10}
              min={0}
              value={movieFormData.rating}
              onChange={handleChange}
              name="rating"
              required
            />
            <span className="fs-5">Girilen Puan : {movieFormData.rating}</span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="actors">
            <Form.Label>Oyuncular</Form.Label>
            <Form.Control
              onChange={handleActorsChange}
              type="text"
              name="actors"
              placeholder="Film Oyuncularını Griniz. (Virgül ile ayırınız. Örn: Oyuncu1, Oyuncu2)"
              required
            />
          </Form.Group>
          <button className="btn btn-outline-primary btn-lg w-100">
            Film Ekle
          </button>
        </Form>
      </div>
    </div>
  );
};

export default AddNewMovies;
