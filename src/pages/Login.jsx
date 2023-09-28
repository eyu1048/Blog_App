import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [_, setCookies] = useCookies(["access_token"]);
  const [cookies, setAdminTokenCookies] = useCookies(["admin_token"]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/admin/login",
        formData
      );

      console.log(response.data);
      setCookies("access_token", response.data.token);
      setAdminTokenCookies("admin_token", response.data.adminId);
      navigate("/admin");
      // setFormData(response.data.data)
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2 className="form-title">Login</h2>
      <input
        type="text"
        placeholder="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
