const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = 'SECRET_KEY'; 

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './users.db'
});

const User = sequelize.define('User', {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
});

app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({ email, password: hashedPassword });
        res.status(201).json({ id: user.id });
    } catch (error) {
        res.status(400).json({ error: "Email zajęty lub błędne dane" });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).send("Nie ma takiego użytkownika");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).send("Błędne hasło");

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

const PORT = 3003;
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Serwis Użytkowników na porcie ${PORT}`));
});