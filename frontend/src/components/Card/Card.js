import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import React from "react";
import "./card.css";
import "./card-info.json";

function CardTileGroup({ tiles }) {
  return (
    <CardGroup className="card-tile-group">
      {tiles.map((tile) => (
        <Card>
          <Card.Img variant="top" src={tile.image} />
          <Card.Body>
            <Card.Title>{tile.title}</Card.Title>
            <Card.Text>{tile.text}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">{tile.smalltext}</small>
          </Card.Footer>
        </Card>
      ))}
    </CardGroup>
  );
}

export default CardTileGroup;
