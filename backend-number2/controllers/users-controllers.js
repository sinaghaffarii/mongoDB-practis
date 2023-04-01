const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const User = require('../models/user')

const getUsers = async (req, res, next) => {
    let users

    try {
        users = await User.find({}, '-passwrod')
    } catch (err) {
        const error = new HttpError('Getting users faild', 500)
        return next(error)
    }

    res.json({ users: users.map(user => user.toObject({ getters: true })) })
}

const singup = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new HttpError('Invalid Inputs', 422)
    }

    const { name, email, password } = req.body

    let existingUser

    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError('Sing up faild.', 500)
        return next(error)
    }

    if (existingUser) {
        const error = new HttpError('User exist.', 422)
        return next(error)
    }

    const createdUser = new User({
        name: name,
        email: email,
        password: password,
        image: 'url',
        posts: []
    })

    try {
        await createdUser.save()
    } catch (err) {
        const error = new HttpError('Sing up faild.', 500)
        return next(error)
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) })
}

const login = async (req, res, next) => {
    const { email, password } = req.body

    let existingUser

    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError('Logimn faild.', 500)
        return next(error)
    }

    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError('Invalid inputs.', 401)
        return next(error)
    }

    res.json({ message: 'Logged in' })
}

exports.getUsers = getUsers
exports.singup = singup
exports.login = login