import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);

  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      axios
        .get("http://localhost:5000/v1/students")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [deleted]);

  function handleDelete(student_id) {
    axios
      .delete(`http://localhost:5000/v1/delete/${student_id}`)
      .then((res) => {
        console.log("Student deleted successfully:", res.data);
        setDeleted(true);
      })
      .catch((err) => {
        console.error("Error deleting student:", err);
      });
  }

  return (
    <div className="container-fluid vh-100 vw-100">
      <h3>Students</h3>
      <div className="d-flex justify-content-end">
        <Link className="btn btn-success" to="/create">
          Add Student
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>{student.gender}</td>
              <td>
                <Link
                  className="btn mx-2 btn-success"
                  to={`/read/${student.student_id}`}
                >
                  Read
                </Link>
                <Link
                  className="btn mx-2 btn-success"
                  to={`/edit/${student.student_id}`}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(student.student_id)}
                  className="btn mx-2 btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
