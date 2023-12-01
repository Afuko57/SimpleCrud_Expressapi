import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Create() {
  const { state } = useAuth();
  const [values, setValues] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:5000/v1/add_user", values)
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
          <h3>Add Student</h3>
          <div className="d-flex justify-content-end">
            <Link to="/" className="btn btn-success">
              back
            </Link>
          </div>
          {state.role === "admin" ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  required
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  required
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="gender"
                  required
                  onChange={(e) =>
                    setValues({ ...values, gender: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  required
                  onChange={(e) =>
                    setValues({ ...values, age: e.target.value })
                  }
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

export default Create;
