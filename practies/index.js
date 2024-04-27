const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")))

app.set('view engine', 'ejs')




app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {

        return res.render('home', { files })
    })
})
app.get('/:filename', (req, res) => {
    fs.readFile('./files/' + req.params.filename, 'utf-8', (err, data) => {
        if (err) {
            return res.send(500).json({ message: 'internal server error' })
        }
        if (data) {
            return res.send(data)
        } else {
            return res.send('file not found')
        }
    });
});


app.post('/task', (req, res) => {
    fs.writeFile(`./files/${(req.body.name).split(" ").join("")}.txt`, req.body.description, (err) => {
        if (err) {
            return res.send(500).json({ message: 'internal server error' })
        } else {
            return res.redirect('/')
        }

    })

})



app.listen(3000, () => {
    console.log('server is running at port 3000');
})