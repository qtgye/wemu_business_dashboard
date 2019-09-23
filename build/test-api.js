const express = require('express');
const app = express()
const port = 8888;

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post('/', (req, res) => {
	res.send(JSON.stringify(req.body, null, '	'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))