const express = require('express');
const app = express()


// this middlework work for each route's
app.use(function (req, res, next) {
    console.log('middleware')
    next()
})

app.get('/', (req, res) => {
    res.send('hello world')
})


app.listen(3000, () => {
    console.log('server is running at port 3000')
})