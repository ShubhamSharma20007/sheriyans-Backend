const express = require('express');
const app = express();
const ejs = require('ejs');
const UserModel = require('./models/user')
const cookieParser = require('cookie-parser')
const PostModel = require('./models/post')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


app.set('view engine', "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.get("/", (req, res) => {
    return res.render('index')
})

app.get("/login", (req, res) => {
    return res.render('login')
})

app.post('/create', async (req, res) => {

    const existUser = await UserModel.findOne({ email: req.body.email })
    if (existUser) return res.send("User already exist")

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, async function (err, hash) {
            let user = await UserModel.create({
                username: req.body.name,
                name: req.body.username,
                password: hash,
                age: 23,
                email: "shubham@gmail.com"
            })
            // send the jwt token
            const option = {
                email: user.email,
                userId: user._id
            }
            await jwt.sign(option, "shubhamsharma", { expiresIn: "1d" }, (err, token) => {
                if (err) throw new Error(err);
                res.cookie('token', token)
                return res.send(user)
            })


        });
    });


})


app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const findUser = await UserModel.findOne({ email });
    if (!findUser) return res.send("User not found")
    await bcrypt.compare(password, findUser.password, (err, result) => {
        if (err) return res.send("Something went wrong")
        else {
            const option = {
                email: findUser.email,
                userId: findUser._id
            }
            jwt.sign(option, "shubhamsharma", { expiresIn: "1d" }, (err, token) => {
                if (err) throw new Error(err);
                res.cookie('token', token)
                return res.redirect('/profile')
            })
        }
    })
})

app.get("/logout", (req, res) => {
    res.clearCookie('token')
    return res.redirect('/login')

})

app.get("/profile", loggedIn, (req, res) => {
    console.log(req.user)
    const loginUser =  req.user.email
    return res.send(loginUser)

})


// loggedIn Middleware
function loggedIn(req, res, next) {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, 'shubhamsharma', (err, decoded) => {
            if (err) return res.send('unauthorized person')
            req.user = decoded
            next()
        })
    }
    return res.redirect('/login')
}

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})