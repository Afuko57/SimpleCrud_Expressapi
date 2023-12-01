// routes/users.js
const express = require("express");
const db = require("../configs/db");
const { handleErrorResponse } = require("../helpers/common");

const router = express.Router();

/**
 * @swagger
 * /v1/add_user:
 *   post:
 *     summary: Add a new student
 *     description: Add a new student to the database
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.post("/v1/add_user", (req, res) => {
  const sql =
    "INSERT INTO student_details (`name`,`email`,`age`,`gender`) VALUES (?, ?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.age, req.body.gender];
  db.query(sql, values, (err, result) => {
    if (err) return handleErrorResponse(res, err);
    return res.json({ success: "Student added successfully" });
  });
});

/**
 * @swagger
 * /v1/edit_user/{student_id}:
 *   post:
 *     summary: Edit a student by ID
 *     description: Edit a student in the database by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.post("/v1/edit_user/:student_id", (req, res) => {
  const id = req.params.student_id;
  const sql =
    "UPDATE student_details SET `name`=?, `email`=?, `age`=?, `gender`=? WHERE student_id=?";
  const values = [
    req.body.name,
    req.body.email,
    req.body.age,
    req.body.gender,
    id,
  ];
  db.query(sql, values, (err, result) => {
    if (err){
      console.error(err); 
      return handleErrorResponse(res, err);
    }
    return res.json({ success: "Student updated successfully" });
  });
});

/**
 * @swagger
 * /v1/delete/{student_id}:
 *   delete:
 *     summary: Delete a student by ID
 *     description: Delete a student from the database by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: student_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the student
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.delete('/v1/delete/:student_id', (req, res) => {
  const id = req.params.student_id;
  const sql = "DELETE FROM student_details WHERE student_id=?";
  const values = [id];
  db.query(sql, values, (err, result) => {
    if (err) return handleErrorResponse(res, err);
    return res.json({ success: "Student deleted successfully" });
  });
});

module.exports = router;

