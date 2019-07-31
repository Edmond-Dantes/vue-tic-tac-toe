const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const indexPath = path.resolve('app', './index.html')
  fs.readFile(indexPath, (err, file) => {
    if (err) throw err;
    res.send(file.toString());
  });
})

app.get('*.js', express.static('app'))

app.listen(port, () => console.log(`server listening on port ${port}!`))