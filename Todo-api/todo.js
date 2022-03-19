const express = require('express')
const conn = require('../dbConnection')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const isLggedIn = require('../middlewares/auth')

console.log(typeof isLggedIn)

router.get('/', (req, res) => {
    res.json({
        message: 'Hello From API!'
    })
})

router.post('/signup', (req, res) => {
    let { username, password } = req.body
    // validate username and password
    if (!/^[a-zA-Z\-]{4, 8}/.test(username) && password.length < 6) {
        return res.json({ message: "Invalid username or password!" })
    }

    conn.query(`select username from users where username = ?`, [username], async (err, result) => {
        if (err) {
            return res.json({ message: 'Server Error!' })
        }
        if (result.length > 0) {
            return res.json({ message: "username already registered!" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)
        conn.query(`INSERT INTO Users(username, password) values (?, ?)`, [username, hashedPassword], (err) => {
            if (!err) {
                return res.json({ message: "Sign Up Succefull!" })
            }
            return res.json({ message: "Server Error!" })
        })
    })
})
router.post('/signin', (req, res) => {
    let { username, password } = req.body
    // vaidate username and password
    if (!/^[a-zA-Z\-]{4, 8}/.test(username) && password.length < 6) {
        return res.json({ message: "Invalid username or password!" })
    }
    conn.query(`select * from users where username = ?`, [username], async (err, result) => {
        if (err) {
            return res.json({ message: 'Server Error!' })
        }
        if (result.length === 0) {
            return res.json({ message: "username not registered!" })
        }
        const isMatch = await bcrypt.compare(password, result[0].password)
        if (!isMatch) {
            return res.json({ message: "Wrong Password!" })
        }
        const accessToken = jwt.sign({ username: result[0].username, id: result[0].id }, process.env.TOKEN_SECRET, { expiresIn: '1h' })
        res.set({ "authrization": accessToken })
        return res.json({
            message: 'login success!',
            authrization: accessToken
        })
    })

})
router.post('/todo/new', isLggedIn, (req, res) => {
    const todo = req.body.todo
    // insert a todo into database
    conn.query(`INSERT INTO todos(userId, todo) values (?, ?)`, [req.payload.id, todo], (err) => {
        // send errors
        if (err) {
            return res.status(403).json({ message: "Server Error!" })
        }
        //return success message
        return res.json({ message: "New todo added succefully!" })
    })
})
router.get('/todo/all', isLggedIn, (req, res) => {
    conn.query('select * from todos where userId = ?', [req.payload.id], (err, result) => {
        if (err) {
            //send error
            console.log(err)
            return res.status(403).json({ message: 'Server Error!' })
        }
        // return data after success
        return res.json({
            message: "List of all todos",
            todos: result
        })
    })
})
router.delete('/todo/delete', isLggedIn, (req, res) => {

    conn.query('DELETE from todos where userId = ? and id = ?', [req.payload.id, req.body.id], (err, result) => {
        if (err) {
            //send error
            console.log(err)
            return res.status(403).json({ message: 'Server Error!' })
        }
        // return data after success
        return res.json({
            message: "Todo Deleted!"
        })
    })
})



module.exports = router