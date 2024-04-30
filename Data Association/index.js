const express = require('express');
const app = express();
const ejs = require('ejs');
const UserModel = require('./models/user')
const cookieParser = require('cookie-parser')


app.set('view engine', "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.get("/", (req, res) => {
    return res.render('index')
})

app.post('/create', async (req, res) => {
    return console.log(req.body)
    let user = await UserModel.create({
        username: req.body.name,
        name: req.body.username,
        password: req.body.password,
        age: 23,
        email: "shubham@gmail.com"
    })
    return res.send(user)
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})