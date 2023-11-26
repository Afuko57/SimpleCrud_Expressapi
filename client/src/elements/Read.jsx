import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Read() {
  const [student, setStudent] = useState({});
  const { student_id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/v1/get_student/${student_id}`)
      .then((res) => {
        const responseData = res.data;

        // ตรวจสอบว่า responseData ไม่เป็น null และมี Property อย่างน้อย 1 อันใน Object.keys(responseData)
        if (responseData && Object.keys(responseData).length > 0) {
          // ใช้ข้อมูลที่ได้จาก API
          setStudent(responseData);
        } else {
          console.error("API response is not as expected:", responseData);
          // แสดงข้อความหรือทำอย่างอื่นตามที่คุณต้องการ
        }
      })
      .catch((err) => console.error(err));
  }, [student_id]);

  return (
    <div className="container-fluid vw-100 vh-100">
      <h1>User {student_id}</h1>
      <Link to="/" className="btn btn-success">
        Back
      </Link>

      {student && Object.keys(student).length > 0 ? (
        <ul className="list-group" key={student.student_id}>
          <li className="list-group-item">
            <b>student_id: </b>
            {student["student_id"]}
          </li>
          <li className="list-group-item">
            <b>Name: </b>
            {student["name"]}
          </li>
          <li className="list-group-item">
            <b>Email: </b>
            {student["email"]}
          </li>
          <li className="list-group-item">
            <b>Age: </b>
            {student["age"]}
          </li>
          <li className="list-group-item">
            <b>Gender: </b>
            {student["gender"]}
          </li>
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default Read;
