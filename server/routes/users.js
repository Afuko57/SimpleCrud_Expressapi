// routes/users.js
const express = require("express");
const db = require("../configs/db");
const { handleErrorResponse } = require("../helpers/common");

const router = express.Router();

/**
 * @swagger
 * /add_user:
 *   post:
 *     summary: Add a new student
 *     description: Add a new student to the database
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
router.post("/add_user", (req, res) => {
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
 * /edit_user/{id}:
 *   post:
 *     summary: Edit a student by ID
 *     description: Edit a student in the database by ID
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
router.post("/edit_user/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE student_details SET `name`=?, `email`=?, `age`=?, `gender`=? WHERE id=?";
  const values = [
    req.body.name,
    req.body.email,
    req.body.age,
    req.body.gender,
    id,
  ];
  db.query(sql, values, (err, result) => {
    if (err) return handleErrorResponse(res, err);
    return res.json({ success: "Student updated successfully" });
  });
});

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     description: Delete a student from the database by ID
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
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM student_details WHERE id=?";
  const values = [id];
  db.query(sql, values, (err, result) => {
    if (err) return handleErrorResponse(res, err);
    return res.json({ success: "Student deleted successfully" });
  });
});

module.exports = router;
