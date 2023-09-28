import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
  });
  const [files, setFiles] = useState("");
  const [content, setContent] = useState("");
  const [cookies, setAdminTokenCookies] = useCookies(["admin_token"]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files[0]);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    console.log(files);

    const data = new FormData();
    data.set("title", formData.title);
    data.set("summary", formData.summary);
    data.set("file", files);
    data.set("content", content);

    try {
      const response = await axios.post(
        "http://localhost:3001/admin/createPost",
        data
      );

      // console.log("response-d", response.data);
      if (response.status === 200) {
        alert("post created successfully");

        const postId = response.data.data._id;

        // console.log("cookies", cookies);

        const adminId = cookies.admin_token;

        await axios.put(`http://localhost:3001/admin/posts/${postId}/author`, {
          adminId,
        });
        navigate("/");
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <main>
      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="summary"
          value={formData.summary}
          placeholder="Summary"
          onChange={handleChange}
        />
        <input type="file" name="file" onChange={handleFileChange} />
        <ReactQuill
          theme="snow"
          name="content"
          value={content}
          onChange={(value) => setContent(value)}
          modules={modules}
          formats={formats}
        />
        <button type="submit">Create Post</button>
      </form>
    </main>
  );
};

export default CreatePost;
