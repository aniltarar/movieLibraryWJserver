import React from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import "./MovieItem.css";

const MovieItem = ({ movie }) => {
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
    year,
    actors,
  } = movie;
  console.log(image);

  return (
    <Card style={{ maxWidth: "50%", minWidth: "50%", margin: "10px" }}>
      <Row className="g-0 p-3">
        <Col
          sm={12}
          md={10}
          lg={8}
          xl={4}
          className="d-flex align-items-center "
        >
          <Card.Img className="movie-image " variant="top" src={image} />
        </Col>
        <Col xl={8}>
          <Card.Title className="fs-2 text-center d-flex justify-content-around align-items-center">
            <span>{title}</span>
            <span className="d-flex align-items-center gap-1">
              {rating}
              <FaStar color="#ffc107" />
            </span>
          </Card.Title>
          <hr />

          <Card.Body className="d-flex flex-column  align-items-center  ">
            <Card.Title className="d-flex  align-items-center gap-1">
              {category.map((cat) => (
                <Badge key={cat} bg="warning">
                  {cat}
                </Badge>
              ))}
            </Card.Title>
            <Card.Text className="text-clamp-15">{description}</Card.Text>

            <ul className="list-group">
              <li className="list-group-item">Senarist : {scenario}</li>
              <li className="list-group-item">Yönetmen : {director}</li>
              <li className="list-group-item">Yayın Tarihi : {year}</li>
              <li className="list-group-item">
                {" "}
                Oyuncular : [ {actors.map((actor) => actor + ", ")} ]
              </li>
            </ul>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default MovieItem;
