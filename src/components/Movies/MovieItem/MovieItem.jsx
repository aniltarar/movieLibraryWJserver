import React from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import "./MovieItem.css";

const MovieItem = ({ movie }) => {
  const {
    
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



  return (
    <Card
      style={{
        maxWidth: "60%",
        minWidth: "60%",
        minHeight: "500px",
        margin: "10px",
      }}
      className="d-flex justify-content-center card shadow-md "
    >
      <Row className="g-2 p-3 ">
        <Col
          sm={12}
          md={10}
          lg={8}
          xl={4}
          className="d-flex justify-content-center align-items-center"
        >
          <Card.Img
            className="movie-image border border-warning "
            alt={`${title} filminin afiş görseline şuanda ulaşılamamaktadır.`}
            variant="top"
            src={image}
          />
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
            <Card.Title className="d-flex  align-items-center gap-3">
              {category.map((cat) => (
                <Badge className="badge fs-5" key={cat} bg="warning">
                  {cat}
                </Badge>
              ))}
            </Card.Title>
            <Card.Text className="text-clamp-15 text-wrap ">
              {description}
            </Card.Text>

            <ul className="list-group">
              <li className="list-group-item">Senarist : {scenario}</li>
              <li className="list-group-item">Yönetmen : {director}</li>
              <li className="list-group-item">Yayın Tarihi : {date}</li>
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
