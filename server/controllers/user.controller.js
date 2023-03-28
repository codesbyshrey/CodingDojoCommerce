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

UserController.login = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(401).json({ message: 'Invalid email or password' });
                    }

                    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

                    res.json({ user: user.toJSON(), token });
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ message: 'Server error' });
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        });
};

UserController.register = (req, res) => {
    const { name, email, password, address } = req.body;

    User.findOne({ email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            bcrypt.genSalt(10)
                .then(salt => {
                    bcrypt.hash(password, salt)
                        .then(hashedPassword => {
                            User.create({ name, email, password: hashedPassword, address })
                                .then(user => {
                                    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
                                    res.json({ user: user.toJSON(), token });
                                })
                                .catch(err => {
                                    console.error(err);
                                    res.status(500).json({ message: 'Server error' });
                                });
                        })
                        .catch(err => {
                            console.error(err);
                            res.status(500).json({ message: 'Server error' });
                        });
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ message: 'Server error' });
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        });
};

module.exports = UserController;