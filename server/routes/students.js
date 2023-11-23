// routes/students.js
const express = require("express");
const db = require("../configs/db");
const { handleErrorResponse } = require("../helpers/common");

const router = express.Router();

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Retrieve a list of students
 *     description: Retrieve a list of all students from the database
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get("/students", (req, res) => {
  const sql = "SELECT * FROM student_details";
  db.query(sql, (err, result) => {
    if (err) return handleErrorResponse(res, err);
    return res.json(result);
  });
});

/**
 * @swagger
 * /get_student/{id}:
 *   get:
 *     summary: Retrieve a student by ID
 *     description: Retrieve a student from the database by ID
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
router.get("/get_student/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM student_details WHERE `id`= ?";
  db.query(sql, [id], (err, result) => {
    if (err) return handleErrorResponse(res, err);
    return res.json(result);
  });
});

module.exports = router;
