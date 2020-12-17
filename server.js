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

let token = null;

app.get('/login/github/callback', (req, res) => {
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    code: req.query.code
  };

  let opts = { headers: { accept: 'application/json' } };

  axios.post(`https://github.com/login/oauth/access_token`, body, opts).
    then(res => res.data['access_token']).
    then(_token => {
      token = _token;
      console.log('token:', token);
      res.json({ ok: Success });
    }).
    catch(err => res.status(500).json({ message: err.message }));
  
  opts = { headers: { accept: 'application/json', Authorization: `token ${token}`} };
  
  axios.get(`https://api.github.com/user`, opts )
   .then(res => console.log(res.data))
   .catch(err => res.status(500).json({ message: err.message }))
});


app.listen(5000);
console.log('http://localhost:5000')