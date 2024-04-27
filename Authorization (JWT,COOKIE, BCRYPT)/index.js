const express = require('express');
const app = express();
const cookie = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
app.use(cookie())


app.get("/", (req, res) => {
    // save the cookie on the browser
    res.cookie("name", "shubham sharma")

    res.send("done")
})

app.get("/read", (req, res) => {
    // read the cookie
    const name = req.cookies.name

    res.send("name of cookie is  " + name)
})



// HASING THE PASSWORD

app.get('/pass', (req, res) => {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash("shubham", salt, function (err, hash) {
            if (err) {
                res.send(err)
            }
            res.cookie('saltPass', hash)
            res.send(hash)
        });
    });
})

// COMPARE THE PASSWORD

app.get("/readPass", (req, res) => {
    const pass = req.cookies.saltPass;
    bcrypt.compare('shubham', pass, function (err, result) {
        if (err) throw Error(err);

        res.send(result)
    })
})




// JWT  SIGN

app.get("/jwtSign", (req, res) => {
    const option = {
        email: "shubham@gmail.com",
    }
    jwt.sign(option, "heymynameishubhamsharma", (err, token) => {
        if (err) console.log(err);
        res.cookie('jwtToken', token)
        res.send(token)
    })
})


// GET JWT DATA
// Note :  having set that i  getting the option which is set in option

app.get('/readJwt', (req, res) => {
    const token = req.cookies.jwtToken;
    jwt.verify(token, "heymynameishubhamsharma", (err, data) => {
        if (err) console.log(err);
        console.log(data)
        res.send(data)
        //  output :       { email: 'shubham@gmail.com', iat: 1714155582 }
    })
})


app.listen(3000)