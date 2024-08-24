import React, { useState } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteMovie } from "../../../redux/slices/movieSlice/movieSlice";
import DeletePopUp from "../../General/PopUp/DeletePopUp";
import EditPopUp from "../../General/PopUp/EditPopUp";

const RowMovieItem = ({ movie }) => {
  const { id, title, image, category, actors, scenario } = movie;

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.username;
  const dispatch = useDispatch();

  const [onHover, setOnHover] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  // Delete Handler
  const handleClose = () => setShowDelete(false);
  const handleShow = () => setShowDelete(true);
  const deleteMovieHandler = () => {
    dispatch(deleteMovie(id));
    handleClose();
  };

  // Update Handler
  const handleUpdateClose = () => setShowUpdate(false);
  const handleUpdateShow = () => setShowUpdate(true);

  // Hover effect
  const onHoverCard = () => {
    setOnHover(true);
  };
  const onLeaveCard = () => {
    setOnHover(false);
  };

  return (
    <>
      <Card
        className={`d-flex w-100 justify-content-center card shadow-md ${
          onHover ? "border-3 shadow-xl" : ""
        }`}
        onMouseEnter={onHoverCard}
        onMouseLeave={onLeaveCard}
      >
        <Row className="g-2 p-3">
          <Col
            sm={12}
            md={10}
            lg={8}
            xl={4}
            className="d-flex justify-content-center align-items-center"
          >
            <Card.Img
              className="movie-image border border-warning"
              alt={`${title} filminin afiş görseline şuanda ulaşılamamaktadır.`}
              variant="top"
              src={image}
            />
          </Col>
          <Col xl={8}>
            <Card.Title className="fs-2 text-center d-flex justify-content-around align-items-center">
              <span>{title}</span>
            </Card.Title>
            <hr />

            <Card.Body className="d-flex flex-column align-items-center">
              <Card.Title className="d-flex flex-wrap align-items-center gap-2">
                {category.map((cat) => (
                  <Badge
                    key={cat}
                    bg="dark"
                    className="badge text-light fs-6"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {cat}
                  </Badge>
                ))}
              </Card.Title>

              <Card.Text className="fs-5">
                Filmi Ekleyen Kişi : {username}{" "}
              </Card.Text>

              <ul className="list-group w-100">
                <li className="list-group-item">Senarist : {scenario}</li>
                <li className="list-group-item">
                  Oyuncular : {actors.join(", ")}
                </li>
              </ul>
              <Row className="my-3 gap-3">
                <Col >
                  <button
                    className="btn btn-warning w-100 my*2"
                    onClick={handleUpdateShow}
                  >
                    Düzenle
                  </button>
                </Col>

                <Col>
                  <button className="btn btn-danger w-100" onClick={handleShow}>
                    Sil
                  </button>
                </Col>
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <DeletePopUp
        show={showDelete}
        handleClose={handleClose}
        onConfirm={deleteMovieHandler}
        title={title}
      />
      <EditPopUp
        show={showUpdate}
        handleClose={handleUpdateClose}
        movie={movie}
      />
    </>
  );
};

export default RowMovieItem;
