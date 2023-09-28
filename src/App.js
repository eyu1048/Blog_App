import "./App.css";
import { Route, Routes } from "react-router-dom";
import Post from "./components/Post";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPage from "./pages/AdminPage";
import CreatePost from "./pages/CreatePost";
import AdminHeader from "./components/AdminHeader";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Post />
            </main>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </div>
  );
}

export default App;
