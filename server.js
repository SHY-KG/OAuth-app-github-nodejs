const express = require('express');
const axios = require('axios');

const app = express();

const clientId = ''
const clientSecret = ''

app.get('/', (req,res) => {
    res.send('<a href="/login/github">github login</a>')
})

app.get('/login/github', (req,res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=read:user`)
})

app.listen(5000);
console.log('http://localhost:5000')