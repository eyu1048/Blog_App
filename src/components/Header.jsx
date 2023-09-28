import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const Header = () => {
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
          {cookies.access_token ? (
            <>
              <Link to="/createPost" className="nav-link">
                createPost
              </Link>
              <Link to="/logout" className="nav-link" onClick={Logout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to={cookies.access_token ? "/admin" : "/login"}
                className="nav-link"
              >
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
    </main>
  );
};

export default Header;
