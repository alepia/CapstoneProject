import "./sass/App.scss";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProfilePage from "./Pages/ProfilePage";
import IsLoggedIn from "./Components/IsLoggedIn";
import Explore from "./Pages/Explore";
import { Routes, Route } from "react-router-dom";
import Saved from "./Pages/Saved";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <IsLoggedIn>
              <Home />
            </IsLoggedIn>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/explore" element={<Explore />} />
        <Route
          path="/user"
          element={
            <IsLoggedIn>
              <ProfilePage />
            </IsLoggedIn>
          }
        />
        <Route
          path="/saved"
          element={
            <IsLoggedIn>
              <Saved />
            </IsLoggedIn>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
