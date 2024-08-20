import React, { useState } from "react";
import { Button,  FloatingLabel, Form, Modal, } from "react-bootstrap";
import "./EditPopUp.css";
import { updateMovie } from "../../../redux/slices/movieSlice/movieSlice";
import { useDispatch } from "react-redux";

const EditPopUp = ({ show, handleClose, movie }) => {
  const {
    id,
    addedBy,
    actors,
    category,
    date,
    description,
    director,
    image,
    rating,
    scenario,
    title,
  } = movie;

  const [updatedMovie, setUpdatedMovie] = useState({
    id: id,
    addedBy: addedBy,
    title: title,
    category: category,
    date: date,
    description: description,
    director: director,
    actors: actors,
    rating: rating,
    scenario: scenario,
    image: image,
  });

  const dispatch = useDispatch();
  const onConfirm = () => {
    dispatch(updateMovie(updatedMovie));
    handleClose();
  };

  const checkableCategories = [
    "Action",
    "Adventure",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Historical",
    "Horror",
    "Mystery",
    "Philosophical",
    "Political",
    "Romance",
    "Saga",
    "Satire",
    "Science Fiction",
    "Thriller",
    "Urban",
    "Western",
  ];

  const handleChange = (e) => {
    setUpdatedMovie({
      ...updatedMovie,
      [e.target.name]: e.target.value,
    });
  };

  const handleActorsChange = (e) => {
    const { value } = e.target;
    const actors = value.split(",");

    setUpdatedMovie((prevState) => ({
      ...prevState,
      actors: actors,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setUpdatedMovie((prevState) => ({
        ...prevState,
        category: [...prevState.category, value],
      }));
    } else {
      setUpdatedMovie((prevState) => ({
        ...prevState,
        category: prevState.category.filter((category) => category !== value),
      }));
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        animation={false}
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">
            <span className="fw-bold text-danger">{title}</span> filmi
            düzenleniyor.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="bodyForm">
            <Form>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Film Adı</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={updatedMovie.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="image">
                <Form.Label>Film Afişi</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedMovie.image}
                  name="image"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="director">
                <Form.Label>Yönetmen</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedMovie.director}
                  name="director"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="scenario">
                <Form.Label>Senarist</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedMovie.scenario}
                  name="scenario"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Film Özeti</Form.Label>
                <FloatingLabel
                  controlId="description"
                  label="Film Özetinizi Giriniz."
                  className="mb-3 "
                >
                  <Form.Control
                    style={{ minHeight: "100px", maxHeight: "500px" }}
                    as="textarea"
                    placeholder="Film özetinizi giriniz."
                    value={updatedMovie.description}
                    onChange={handleChange}
                    name="description"
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="date">
                <Form.Label>Yayın Tarihi</Form.Label>
                <Form.Control
                  type="date"
                  value={updatedMovie.date.split("/").join("-")}
                  name="date"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="category">
                <Form.Label>Kategori</Form.Label>
                <div className="categoriesGrid">
                  {checkableCategories.map((category) => (
                    <Form.Check
                      key={category}
                      type="checkbox"
                      label={category}
                      value={category}
                      checked={updatedMovie.category.includes(category)}
                      onChange={handleCategoryChange}
                    />
                  ))}
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="rating">
                <Form.Label>IMDB Puanı</Form.Label>
                <Form.Range
                  max={10}
                  min={0}
                  value={updatedMovie.rating}
                  onChange={handleChange}
                  name="rating"
                />
                <span className="fs-5">
                  Girilen Puan : {updatedMovie.rating}
                </span>
              </Form.Group>

              <Form.Group className="mb-3" controlId="actors">
                <Form.Label>Oyuncular</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedMovie.actors}
                  name="actors"
                  onChange={handleActorsChange}
                />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Vazgeç
          </Button>
          <Button variant="warning" onClick={onConfirm}>
            Düzenle
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditPopUp;
