const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios'); 

const app = express();
app.use(express.json());

const SECRET_KEY = 'SECRET_KEY'; 

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './orders.db'
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

const Orders = sequelize.define('Order', {
    userId: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    bookId: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    quantity: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    }
});

app.get('/api/orders/:userId', async (req, res) => {
    try {
        const orders = await Orders.findAll({ 
            where: { userId: req.params.userId } 
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Błąd serwera" });
    }
});


app.post('/api/orders', authenticateToken, async (req, res) => {
    try {
        const { bookId, quantity, userId } = req.body;

        const response = await axios.get(`http://localhost:3001/api/books/${bookId}`);

        if (response.status === 200) {
            const order = await Orders.create({ userId, bookId, quantity });
            res.status(201).json(order);
        }
    } catch (error) {
        res.status(404).json({ error: "Nie mamy takiej książki." });
    }
});


app.delete('/api/orders/:id', authenticateToken, async (req, res) => {
    try {
        const Id = req.params.id;

        const order = await Orders.findByPk(Id);

        if (!order) {
            return res.status(404).json({ message: "Nie znaleziono zamówienia o tym ID" });
        }

        await order.destroy();

        res.json({ message: `Zamówienie o ID ${Id} zostało usunięte.` });
    } catch (error) {
        res.status(500).json({ error: "Błąd podczas usuwania zamówienia" });
    }
});

app.patch('/api/orders/:id', authenticateToken, async (req, res) => {
    try {
        const orderId = req.params.id;
        const { quantity } = req.body;

        const order = await Orders.findByPk(orderId);

        if (!order) {
            return res.status(404).json({ message: "Nie znaleziono zamówienia" });
        }

        await order.update({ quantity });

        res.json({ message: "Zaktualizowano", order });
    } catch (error) {
        console.error("--- LOG BŁĘDU ---");
        console.error(error); 
        res.status(500).json({ error: error.message }); 
    }
});

const PORT = 3002;
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Serwis Użytkowników na porcie ${PORT}`));
});