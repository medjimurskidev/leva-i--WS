const express = require('express');
const app = express();
const port = 3001;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var messages = [];

app.set('view engine', 'ejs');

app.get('/', (request, response) => {
	response.render('index');
});

app.post('/messages', (request, response) => {
	response.render('chat', { messages: messages })
})

app.post('/send_message', (request, response) => {
	var message = request.body.newmessage;
	var author = request.body.author || 'anon';
	messages.push({
		author: author,
		msg: message
	});

	response.redirect('/chat');
});

app.get('/chat', (request, response) => {
	response.render('chat', { messages: messages })
});


app.listen(port, '0.0.0.0', (err) => {
	if (err) {
		return console.log('something bad happened', err)
	}

	console.log(`server is listening on ${port}`)
});


