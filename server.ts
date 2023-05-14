const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('dist'));
//@ts-ignore
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(PORT, () => {
  console.log(`Мой текст и порт: ${PORT}!`);
});
