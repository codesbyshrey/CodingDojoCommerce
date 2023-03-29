const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/project.model');

const UserController = {};

UserController.apiTestUser = (req, res) => {
    res.json({ message: 'User controller is working' });
};

UserController.allUser = (req, res) => {
    User.find()
        .then(userList => res.json(userList))
        .catch(err => res.status(400).json(err));
};

UserController.oneUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(oneUser => res.json(oneUser))
        .catch(err => res.status(400).json(err));
};

UserController.createUser = (req, res) => {
    const newUser = req.body;
    User.create(newUser)
        .then(addedUser => res.json(addedUser))
        .catch(err => res.status(400).json(err));
};

UserController.updateUser = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(400).json(err));
};

UserController.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(message => res.json(message))
        .catch(err => res.status(400).json(err));
};

UserController.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user === null) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if (!correctPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true }).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

UserController.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword
        });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true }).json({ message: 'Registration successful', user: user.toJSON() });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ error: errors });
        } else {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }
};

UserController.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
};


module.exports = UserController;