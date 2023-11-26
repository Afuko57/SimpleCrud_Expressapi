// routes/students.js
const express = require("express");
const db = require("../configs/db");
const { handleErrorResponse } = require("../helpers/common");

const router = express.Router();

/**
 * @swagger
 * /v1/students:
 *   get:
 *     summary: Retrieve a list of students
 *     description: Retrieve a list of all students from the database
 *     tags:
 *       - Students
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get("/v1/students", (req, res) => {
  const sql = "SELECT * FROM student_details";
  db.query(sql, (err, result) => {
    if (err) return handleErrorResponse(res, err);
    return res.json(result);
  });
});

/**
 * @swagger
 * /v1/get_student/{id}:
 *   get:
 *     summary: Retrieve a student by ID
 *     description: Retrieve a student from the database by ID
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the student
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get("/v1/get_student/:student_id", (req, res) => {
  const id = req.params.student_id;
  const sql = "SELECT * FROM student_details WHERE `student_id`= ?";
  db.query(sql, [id], (err, result) => {
    if (err) return handleErrorResponse(res, err);
    return res.json(result);
  });
});

module.exports = router;