import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login.page";
import ProfilePage from "./pages/profile.page";
import ProtectedRoute from "./components/protectedRoute";
import SignupPage from "./pages/signup.page";

function App() {
  return (
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
  );
}
export default App;
