const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

module.exports = (pool) => {
  const router = express.Router();

  const createTransporter = () => {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  };

  router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if user exists
      const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (userExists.rows.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = new User(email, hashedPassword);

      // Insert into DB
      await pool.query('INSERT INTO users (id, email, password, confirmed) VALUES ($1, $2, $3, $4)', [user.id, user.email, user.password, user.confirmed]);

      // Send confirmation email
      const transporter = createTransporter();
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Confirmation',
        text: `Please confirm your email by clicking the link: http://localhost:3000/confirm/${user.id}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.status(201).json({ message: 'User registered, please check your email' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/confirm/:id', async (req, res) => {
    const { id } = req.params;

    try {
      await pool.query('UPDATE users SET confirmed = true WHERE id = $1', [id]);
      res.json({ message: 'Email confirmed' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  return router;
};