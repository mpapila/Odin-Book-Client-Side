import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PostFeed from "../components/PostFeed";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <div>
        <Header />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <PostFeed />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
