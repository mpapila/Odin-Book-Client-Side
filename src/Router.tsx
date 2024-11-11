import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PostPage from "./pages/PostPage";
import Profile from "./pages/Profile";
import Notification from "./pages/Notification";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/posts/:id" element={<PostPage />} />
      <Route path="/notification" element={<Notification />} />
    </Routes>
  );
}

export default Router;
