import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../../features/goals/GoalForm";
import GoalItem from "../../features/goals/GoalItem";
import Spinner from "../../components/Spinner/Spinner";
import { getGoals, reset } from "../../features/goals/goalSlice";

// Accessed once logged in
function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      // If user is not signed in, go to login page
      navigate("/login");
    } else {
      // User is signed in, show goals
      dispatch(getGoals()); // resolves goals crashing, video 4 @33:30
    }

    //dispatch(getGoals()); // error: if user not signed in, should not dispatch goals

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
