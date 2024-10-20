import GoalForm from "../features/goals/GoalForm";
import GoalItem from "../features/goals/GoalItem";
import Spinner from "../components/Spinner";
import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGoals, reset } from "../features/goals/goalSlice";
import Balance from "../components/Balance";

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
      // If user is not signed in, navigates to login page
      navigate("/login");
    } else {
      // User is signed in, show goals
      dispatch(getGoals()); // resolves goals crashing, video 4 @33:30
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="dashboard">
        <nav>
          <NavigationBar className="navbar" />
        </nav>

        <main>
          
          {/* <h1>Welcome {user && user.name}!</h1> */}
          <Balance />
          <GoalForm />

          <h1 className="mt-5 mb-3">Goals</h1>
          <section className="content mt-3">
            {goals.length > 0 ? (
              <div className="goals">
                {goals.map((goal) => (
                  <GoalItem key={goal._id} goal={goal} />
                ))}
              </div>
            ) : (
              <div className="mt-5">
                <h2>You have not set any goals</h2>
              </div>
            )}
          </section>
        </main>

        <footer className="p-10">
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default Dashboard;
