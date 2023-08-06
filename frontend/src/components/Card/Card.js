import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import useSound from "use-sound";
import mySong from "./Songs/LaBouche-BeMyLover-Hypatan.mp3";
import "./card-info.json";

function CardTileGroup({ tiles }) {
  const [playSound] = useSound(mySong, { volume: 0.3 });

  const handleClick = () => {
    playSound();
  };

  return (
    <CardGroup className="card-tile-group">
      <Card>
        <Card.Img variant="top" src={tiles[0].image} />
        <Card.Body>
          <Card.Title>{tiles[0].title}</Card.Title>
          <Card.Text>{tiles[0].text}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            <Button variant="danger" onClick={() => handleClick()}>
              {tiles[0].smalltext}
            </Button>
            <Button href="/PageRed" variant="danger">
              Go to Page Red
            </Button>
          </small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src={tiles[1].image} />
        <Card.Body>
          <Card.Title>{tiles[1].title}</Card.Title>
          <Card.Text>{tiles[1].text}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            <Button variant="danger" onClick={() => handleClick()}>
              {tiles[1].smalltext}
            </Button>
            <Button href="/PageBlue" variant="danger">
              Go to Page Blue
            </Button>
          </small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src={tiles[2].image} />
        <Card.Body>
          <Card.Title>{tiles[2].title}</Card.Title>
          <Card.Text>{tiles[2].text}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            <Button variant="danger" onClick={() => handleClick()}>
              {tiles[2].smalltext}
            </Button>
            <Button href="/PageBlue" variant="danger">
              Go to Page Green
            </Button>
          </small>
        </Card.Footer>
      </Card>
    </CardGroup>
  );
}

export default CardTileGroup;
