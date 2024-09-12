import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PostFeed from "../components/PostFeed";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import Profile from "../components/Profile";
import Notification from "../components/Notification";
import PostPage from "./PostPage";

function Home() {
  const activeButton = useSelector(
    (state: RootState) => state.Sidebar.setActiveButton
  );
  return (
    <>
      <div>
        <Header />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ padding: "20px" }}>
            {activeButton === "home" && <PostFeed />}
            {activeButton === "profile" && <Profile />}
            {activeButton === "postpage" && <PostPage />}
            {activeButton === "notification" && <Notification />}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
