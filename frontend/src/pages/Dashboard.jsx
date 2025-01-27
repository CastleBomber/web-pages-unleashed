import React, { useEffect } from "react";
import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";
import TransactionsDashboard from "../components/TransactionsDashboard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Accessed once logged in
function Dashboard() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      // If user is not signed in, navigates to login page
      navigate("/login");
    } 
  }, [user, navigate]);

  return (
    <>
      <div className="dashboard">
        <nav>
          <NavigationBar className="navbar" />
        </nav>

        <main>
          <h1>Welcome {user && user.name}!</h1>
        </main>

        <article className="article">
          <TransactionsDashboard loggedInUser={user} />
        </article>

        <footer className="p-10">
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default Dashboard;
