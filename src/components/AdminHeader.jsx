import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const AdminHeader = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const Logout = () => {
    setCookies("access_token", "");
  };
  return (
    <main>
      <header>
        <Link to="/" className="logo">
          MyBlog
        </Link>
        <nav>
          <Link to="/createPost" className="nav-link">
            createPost
          </Link>
          <Link to="/login" className="nav-link" onClick={Logout}>
            Logout
          </Link>
        </nav>
      </header>
      {/* <div>posts</div> */}
    </main>
  );
};

export default AdminHeader;
