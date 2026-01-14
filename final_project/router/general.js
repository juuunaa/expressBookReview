const express = require("express");
const axios = require("axios");
let books = require("./booksdb.json");

const public_users = express.Router();

/**
 * Get all books
 */
public_users.get("/", async (req, res) => {
  try {
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving books" });
  }
});

/**
 * Get book by ISBN
 */
public_users.get("/isbn/:isbn", async (req, res) => {
  const isbn = req.params.isbn;

  try {
    const book = books[isbn];
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error retrieving book" });
  }
});

/**
 * Get books by author
 */
public_users.get("/author/:author", async (req, res) => {
  const author = req.params.author;
  let result = {};

  try {
    Object.keys(books).forEach(isbn => {
      if (books[isbn].author === author) {
        result[isbn] = books[isbn];
      }
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving books" });
  }
});

/**
 * Get books by title
 */
public_users.get("/title/:title", async (req, res) => {
  const title = req.params.title;
  let result = {};

  try {
    Object.keys(books).forEach(isbn => {
      if (books[isbn].title === title) {
        result[isbn] = books[isbn];
      }
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving books" });
  }
});

/**
 * Get book review
 */
public_users.get("/review/:isbn", async (req, res) => {
  const isbn = req.params.isbn;

  try {
    res.status(200).json(books[isbn].reviews);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving reviews" });
  }
});

module.exports.general = public_users;
