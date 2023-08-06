import Button from "react-bootstrap/Button";
import { BsGithub } from "react-icons/bs";
import { BsTiktok } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="footer">
      <Button variant="primary">
        <BsGithub />
      </Button>
      <Button variant="secondary">
        <BsTiktok />
      </Button>
      <Button variant="success">
        <BsYoutube />
      </Button>
    </div>
  );
};

export default Footer;
