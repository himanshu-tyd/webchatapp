import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignUp from "../pages/SignUp";
import LogIn from "../pages/LogIn";
import Dashboard from "../pages/Dashboard";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const FileRouter = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/inbox"/> : <SignUp />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/inbox" /> : <LogIn />}
        />
        <Route path="/inbox" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default FileRouter;
