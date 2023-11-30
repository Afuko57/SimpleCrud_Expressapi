// Edit.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
  const [data, setData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/v1/get_student/${id}`)
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/v1/edit_user/${id}`, data)
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid vw-100 vh-100">
      <h1>User {id}</h1>
      <Link to="/" className="btn btn-success">
        Back
      </Link>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input
            value={data.name || ""}
            type="text"
            name="name"
            required
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="email">Email</label>
          <input
            value={data.email || ""}
            type="email"
            name="email"
            required
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="gender">Gender</label>
          <input
            value={data.gender || ""}
            type="text"
            name="gender"
            required
            onChange={(e) => setData({ ...data, gender: e.target.value })}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="age">Age</label>
          <input
            value={data.age || ""}
            type="number"
            name="age"
            required
            onChange={(e) => setData({ ...data, age: e.target.value })}
          />
        </div>
        <div className="form-group my-3">
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
