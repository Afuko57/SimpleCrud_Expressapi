const express = require("express");
const db = require("../configs/db");
const { handleErrorResponse } = require("../helpers/common");

const router = express.Router();

/**
 * @swagger
 * /v1/Login:
 *   post:
 *     summary: Login
 *     description: Login
 *     tags:
 *       - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.post('/v1/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users_login WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        res.json({ message: 'Login successful', user: results[0] });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
});

module.exports = router;
