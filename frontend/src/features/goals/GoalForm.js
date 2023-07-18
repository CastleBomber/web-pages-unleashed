import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "./goalSlice";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function GoalForm() {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createGoal({ text }));
    setText("");
  };

  return (
    <section className="form">
      <Form className="mt-3" onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label size="lg">New Goal</Form.Label>
          <Form.Control
            placeholder="Enter goal"
            size="lg"
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>

        <div className="goal-submit-button">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </section>
  );
}

export default GoalForm;
