import React, { useState } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteMovie } from "../../../redux/slices/movieSlice/movieSlice";
import DeletePopUp from "../../General/PopUp/DeletePopUp";

const RowMovieItem = ({ movie }) => {
  const {
    id,
    addedBy,
    title,
    rating,
    image,
    category,
    description,
    scenario,
    director,
    date,
    actors,
  } = movie;

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.username;
  const dispatch = useDispatch();

  const deleteMovieHandler = () => {
    dispatch(deleteMovie(id));
    handleClose();
  };
  

  const [showDelete, setShowDelte] = useState(false);
  const handleClose = () => setShowDelte(false);
  const handleShow = () => setShowDelte(true);

  return (
    <>
      <Card>
        <Row className="p-3">
          <Col
            sm={12}
            md={10}
            lg={8}
            xl={4}
            className="d-flex justify-content-start align-items-center "
          >
            <Card.Img
              className="movie-image border border-warning "
              alt={`${title} filminin afiş görseline şuanda ulaşılamamaktadır.`}
              variant="top"
              style={{ maxWidth: "50%", maxHeight: "500%" }}
              src={image}
            />
          </Col>
          <Col xl={8}>
            <Card.Title className="fs-2 text-center d-flex justify-content-around align-items-center">
              <span>{title}</span>
            </Card.Title>
            <hr />

            <Card.Body className="d-flex flex-column  align-items-center ">
              <Card.Title className="d-flex  align-items-center gap-3">
                {category.map((cat) => (
                  <Badge
                    key={cat}
                    bg="dark"
                    className="badge text-light   fs-5"
                  >
                    {cat}
                  </Badge>
                ))}
              </Card.Title>
              <Card.Text className="fs-5">
                Filmi Ekleyen Kişi : {username}{" "}
              </Card.Text>
              <div className="controllMovie d-flex w-100 justify-content-end gap-3 ">
                <button className="btn btn-warning">Düzenle</button>
                <button className="btn btn-danger" onClick={handleShow}>
                  Sil
                </button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <DeletePopUp show={showDelete} handleClose={handleClose} onConfirm={deleteMovieHandler} title = {title} />
    </>
  );
};

export default RowMovieItem;
