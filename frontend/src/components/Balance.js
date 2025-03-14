// This may be an original class I created, probably morphed from another script
import React, { useContext, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "../components/Spinner";
import { TransactionContext } from "../context/TransactionContext";
import { SiEthereum } from "react-icons/si";
import { shortenAddress, shortenBalance } from "../utils/shortenAddress";
import { AiFillPlayCircle } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Display Crypto balances on Home page
const Balance = () => {
  const {
    connectWallet,
    currentAccount,
    userBalance,
    formData,
    sendTransaction,
    handleChange,
    isLoading,
  } = useContext(TransactionContext);

  const [displayName, setDisplayName] = useState("");

  // Fetch user data based on currentAccount
  useEffect(() => {
    const fetchUserName = async () => {
      if (!currentAccount) {
        setDisplayName(""); // Blank when not signed in
        return;
      }

      try {
        const response = await fetch(`/api/wallets/address/${currentAccount}`);
        const data = await response.json();

        if (response.ok && data.name) {
          setDisplayName(data.name); // User name if found
        } else {
          setDisplayName("Guest User"); // Fallback to Guest User
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setDisplayName("Guest User XXX"); // Handle API errors
      }
    };

    fetchUserName();
  }, [currentAccount]);

  const handleSubmit = (e) => {
    const { addressTo, amount } = formData;

    e.preventDefault();

    if (!addressTo || !amount) {
      console.log("handleSubmit error: addressTo || amount");
      return;
    }

    sendTransaction();
  };

  return (
    <div className="balance">
      <h1>Send Crypto</h1>

      {/* Sign in to crypto wallet */}
      {!currentAccount && (
        <Button onClick={connectWallet} className="mt-3 mb-3">
          <AiFillPlayCircle />
          <p>Connect Wallet</p>
        </Button>
      )}

      {/* Crypto card */}
      <div className="crypto-card mb-3 mt-3">
        <div className="crypto-card-container-1">
          <SiEthereum />
        </div>
        <div className="crypto-card-container-2">
          <div className="p1">{displayName}</div>
          <div className="p1">{shortenAddress(currentAccount)}</div>
          <div className="p1">Balance: {shortenBalance(userBalance)}</div>
          <div className="p1">SepoliaETH</div>
        </div>
      </div>

      <ToastContainer />

      {/* Form for user inputs: address to and amount */}
      <Form className="mt-3">
        <Row>
          <Col xs={7}>
            <InputGroup className="mb-3">
              <InputGroup.Text>Address To</InputGroup.Text>
              <Form.Control
                placeholder="0x1234"
                name="addresTo"
                type="text"
                value={formData.addressTo}
                onChange={(e) => handleChange(e, "addressTo")}
              />
            </InputGroup>
          </Col>

          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Text>Amount</InputGroup.Text>
              <Form.Control
                placeholder="♦ 1.000"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleChange(e, "amount")}
              />
            </InputGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={7}>
            <InputGroup className="mb-3">
              <InputGroup.Text>Message</InputGroup.Text>
              <Form.Control
                placeholder="Message"
                name="message"
                type="text"
                onChange={(e) => handleChange(e, "message")}
              />
            </InputGroup>
          </Col>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Text>GIF Keyword</InputGroup.Text>
              <Form.Control
                placeholder="Keyword"
                name="keyword"
                type="text"
                onChange={(e) => handleChange(e, "keyword")}
              />
            </InputGroup>
          </Col>
        </Row>

        {/* Loader */}
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="register-button mb-3">
            <Button onClick={handleSubmit} variant="primary" type="submit">
              Send Now
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default Balance;
