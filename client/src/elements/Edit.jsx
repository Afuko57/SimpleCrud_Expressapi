import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";

function Edit() {
  const { state } = useAuth();
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Edit User {id}</h1>
          <div className="d-flex justify-content-end">
            <Link to="/" className="btn btn-success mb-3">
              Back
            </Link>
          </div>
          {state.role === "admin" ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  value={data.name || ""}
                  type="text"
                  className="form-control"
                  name="name"
                  required
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  value={data.email || ""}
                  type="email"
                  className="form-control"
                  name="email"
                  required
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <input
                  value={data.gender || ""}
                  type="text"
                  className="form-control"
                  name="gender"
                  required
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  value={data.age || ""}
                  type="number"
                  className="form-control"
                  name="age"
                  required
                  onChange={(e) => setData({ ...data, age: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p>You do not have permission to access this page.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Edit;
