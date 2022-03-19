const express = require('express')
const app = express()

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

const todoApi = require('./Todo-api/todo')
app.use('/api/v1', todoApi)


app.get('/', (req, res) => {
    res.json({
        message: 'Hello From Server!'
    })
})


app.listen(4000, () => {
    console.log("server running on port:4000")
})