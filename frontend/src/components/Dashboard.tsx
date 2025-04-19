import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here (e.g., clearing tokens, session storage, etc.)
    navigate("/"); // Redirect to the login page
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Dashboard</h1>
      <p>You are successfully logged in!</p>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;