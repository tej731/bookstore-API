const express = require('express');
const app = express();
app.use(express.json());

// Sample data for books
let books = [
  { id: 1, title: "Book 1", author: "Author 1", year: "2022" },
  { id: 2, title: "Book 2", author: "Author 2", year: "2023" }
];

// Route to get all books
app.get('/books', (req, res) => {
  res.json({ books });
});

// Route to get a specific book
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json({ book });
});

// Route to add a new book
app.post('/books', (req, res) => {
  const newBook = req.body;
  if (!newBook.title || !newBook.author || !newBook.year) {
    return res.status(400).json({ error: 'Missing data' });
  }
  newBook.id = books.length + 1;
  books.push(newBook);
  res.status(201).json({ message: 'Book added successfully', book: newBook });
});

// Route to update an existing book
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  Object.assign(book, req.body);
  res.json({ message: 'Book updated successfully', book });
});

// Route to delete a book
app.delete('/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Book not found' });
  books.splice(index, 1);
  res.json({ message: 'Book deleted successfully' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
