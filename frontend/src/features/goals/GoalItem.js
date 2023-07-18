import { useDispatch } from "react-redux";
import { deleteGoal } from "./goalSlice";
import Button from "react-bootstrap/Button";

function GoalItem({ goal }) {
  const dispatch = useDispatch();

  return (
    <div className="goal-box">
      <div className="goal-text mb-3">{goal.text}</div>
      <div className="goal-remove-button me-3">
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => dispatch(deleteGoal(goal._id))}
        >
          x
        </Button>
      </div>
    </div>
  );
}

export default GoalItem;
