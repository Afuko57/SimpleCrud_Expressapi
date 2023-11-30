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
        const response = await axios.get(`http://localhost:5000/v1/get_student/${student_id}`, {
          headers: {
            'accept': '*/*',
          },
        });
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
    <div className="container-fluid vw-100 vh-100">
      <h1>User {student.name}</h1>
      <Link to="/" className="btn btn-success">
        Back
      </Link>

      {student && Object.keys(student).length > 0 ? (
        <ul className="list-group" key={student.student_id}>
          <li className="list-group-item">
            <b>student_id: </b>
            {student.student_id}
          </li>
          <li className="list-group-item">
            <b>Name: </b>
            {student.name}
          </li>
          <li className="list-group-item">
            <b>Email: </b>
            {student.email}
          </li>
          <li className="list-group-item">
            <b>Age: </b>
            {student.age}
          </li>
          <li className="list-group-item">
            <b>Gender: </b>
            {student.gender}
          </li>
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default Read;
