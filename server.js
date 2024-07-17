const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
