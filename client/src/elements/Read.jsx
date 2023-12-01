import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Read() {
  const { student_id } = useParams();
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/v1/get_student/${student_id}`);
        setStudent(response.data[0]); // เนื่องจากข้อมูลมีรูปแบบ Array ของ Object
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [student_id]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Student Information</h1>
      <Link to="/" className="btn btn-success mb-4">
        Back
      </Link>

      {student && Object.keys(student).length > 0 ? (
        <ul className="list-group">
          <li className="list-group-item">
            <strong>Student ID:</strong> {student.student_id}
          </li>
          <li className="list-group-item">
            <strong>Name:</strong> {student.name}
          </li>
          <li className="list-group-item">
            <strong>Email:</strong> {student.email}
          </li>
          <li className="list-group-item">
            <strong>Age:</strong> {student.age}
          </li>
          <li className="list-group-item">
            <strong>Gender:</strong> {student.gender}
          </li>
        </ul>
      ) : (
        <p className="text-center">{loading ? 'Loading...' : 'Student not found'}</p>
      )}
    </div>
  );
}

export default Read;
