import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatISO9075 } from "date-fns";

const Post = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/admin/getPost");

        console.log(response.data.data);
        setPosts(response.data.data);
      } catch (ex) {
        console.log(ex);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="post">
      {posts.map((post) => {
        // console.log(post.cover);
        const image = post.cover;
        return (
          <>
            <div>
              <Link to={`/post/${post._id}`}>
                <img
                  src={`http://localhost:3001/admin/${image}`}
                  className="image"
                />
              </Link>
            </div>
            <div>
              <Link to={`/post/${post._id}`} className="no-decor">
                <h2 className="post-title">{post.title}</h2>
              </Link>
              <p className="post-info">
                <Link className="author">{post.author.username}</Link>
                <time>{formatISO9075(new Date(post.createdAt))}</time>
              </p>
              <p className="post-summary">{post.summary}</p>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Post;
