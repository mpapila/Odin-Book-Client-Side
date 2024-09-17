import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PostPage from "./pages/PostPage";
import Profile from "./pages/Profile";
import Notification from "./components/Notification";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile/" element={<Profile />} />
      <Route path="/postpage" element={<PostPage />} />
      <Route path="/notification" element={<Notification />} />
    </Routes>
  );
}

export default Router;
