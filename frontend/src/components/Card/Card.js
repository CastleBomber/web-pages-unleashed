import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React from "react";
import "./card.css";

function Tile() {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title className="card__header">Card Title</Card.Title>
        <Card.Text>xxx yyy zzz</Card.Text>
        <Button variant="primary">Push me to go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default Tile;
