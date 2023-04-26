import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import React from "react";
import "./card.css";
import "./card-info.json";

function CardTileGroup({ tiles }) {
  return (
    <CardGroup className="card-tile-group">
      <Card>
        <Card.Img variant="top" src={tiles[0].image} />
        <Card.Body>
          <Card.Title>{tiles[0].title}</Card.Title>
          <Card.Text>{tiles[0].text}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{tiles[0].smalltext}</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src={tiles[1].image} />
        <Card.Body>
          <Card.Title>{tiles[1].title}</Card.Title>
          <Card.Text>{tiles[1].text}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{tiles[1].smalltext}</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src={tiles[2].image} />
        <Card.Body>
          <Card.Title>{tiles[2].title}</Card.Title>
          <Card.Text>{tiles[2].text}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{tiles[2].smalltext}</small>
        </Card.Footer>
      </Card>
    </CardGroup>
  );
}

export default CardTileGroup;
