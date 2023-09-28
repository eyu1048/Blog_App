import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatISO9075 } from "date-fns";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

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

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedProducts, setUpdatedProducts] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
  });
  const navigate = useNavigate();
  const [cookies, setAdminTokenCookies] = useCookies(["admin_token"]);
  const [files, setFiles] = useState("");
  const [content, setContent] = useState("");

  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files[0]);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(
        `http://localhost:3001/admin/post/${id}`
      );

      console.log("res-data", response.data.data);
      setPost(response.data.data);
    };
    fetchPost();
  }, [id]);

  const handleEdit = () => {
    setShowModal(true);
    setUpdatedProducts(post);
    setFormData({
      title: post.title,
      summary: post.summary,
    });
    setFiles(post.cover);

    setContent(post.content);
  };

  const handleUpdate = async () => {
    
    try {
   
      const data = new FormData();
      data.set("title", formData.title);
      data.set("summary", formData.summary);
      data.set("content", content);
      data.set("file", files);

      const response = await axios.put(
        `http://localhost:3001/admin/post/${id}`,
        data
      );

      console.log("re", response.data.data);
      if (response.status === 200) {
        alert("post created successfully");

        const postId = response.data.data._id;

        // console.log("cookies", cookies);

        const adminId = cookies.admin_token;

        await axios.put(`http://localhost:3001/admin/posts/${postId}/author`, {
          adminId,
        });
        // navigate("/");
      }
      setPost(response.data.data);
      setShowModal(false);
    } catch (ex) {
      console.log(ex);
    }
  };

  if (post === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="postpage">
      <div className="postpage-title">
        <h2>{post.title}</h2>
        <time>{formatISO9075(new Date(post.createdAt))}</time>
        <p>{`BY ${post.author.username}`}</p>
        <p
          className="btn-posts"
          onClick={
            id === cookies.admin_token
              ? handleEdit
              : () =>
                  alert("Sorry, you are not authorized to update this post.")
          }
        >
          EDIT POST
        </p>
      </div>
      <img
        src={`http://localhost:3001/admin/${post.cover}`}
        className="postpage-image"
      />
      <p>{post.summary}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>

      {showModal && (
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          id="editUserModal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Posts Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label className="label"> Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="label">Summary</Form.Label>
                <Form.Control
                  type="text"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="file"
                  name="file"
                  // value={formData.summary}
                  onChange={handleFileChange}
                />
              </Form.Group>

              <ReactQuill
                theme="snow"
                name="content"
                value={content}
                onChange={(value) => setContent(value)}
                modules={modules}
                formats={formats}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleUpdate}
              disabled={
                !formData.title || !formData.summary || !content || !files
              }
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default PostPage;
