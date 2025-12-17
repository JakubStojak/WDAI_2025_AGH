const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = 'SECRET_KEY'; 

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './books.db'
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: "Brak tokena, dostęp zabroniony!" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Token jest nieważny lub wygasł!" });
        req.user = user; 
        next(); 
    });
};

const Book = sequelize.define('Book', {
    title: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    author: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    year: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    }
});

app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.findAll(); 
        
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: "Błąd serwera podczas pobierania książek" });
    }
});

app.get('/api/books/:bookId', async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.bookId); 
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: "Nie znaleziono książki o tym ID." });
        }
    } catch (error) {
        res.status(500).json({ error: "Błąd serwera" });
    }
});

app.post('/api/books', authenticateToken, async (req, res) => {
    try {
        const { title, author, year } = req.body;
        const newBook = await Book.create({ title, author, year });
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ error: "Nie udało się dodać książki." });
    }
});


app.delete('/api/books/:id', authenticateToken, async (req, res) => {
    try {
        const bookId = req.params.id;

        const book = await Book.findByPk(bookId);

        if (!book) {
            return res.status(404).json({ message: "Nie znaleziono książki o tym ID" });
        }

        await book.destroy();

        res.json({ message: `Książka o ID ${bookId} została usunięta.` });
    } catch (error) {
        res.status(500).json({ error: "Błąd podczas usuwania książki" });
    }
});

const PORT = 3001;
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Serwis Użytkowników na porcie ${PORT}`));
});