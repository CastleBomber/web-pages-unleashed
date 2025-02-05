import Button from "react-bootstrap/Button";
import { BsGithub, BsTiktok, BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="footer">
      <a
        href="https://github.com/CastleBomber/web-pages-unleashed"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="primary">
          <BsGithub />
        </Button>
      </a>
      <a
        href="https://www.tiktok.com/@CastleBomber"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="secondary">
          <BsTiktok />
        </Button>
      </a>
      <a
        href="https://www.youtube.com/@CastleBomber"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="success">
          <BsYoutube />
        </Button>
      </a>
    </div>
  );
};

export default Footer;
