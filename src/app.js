// @ts-check

const express = require('express')
const cors = require("cors");
const path = require('path');

const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const apiRouter = require('./routes/index');

// React 빌드된 정적 파일을 'build' 디렉토리에서 제공합니다.
app.use(express.static(path.join(__dirname, '/build')));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/api', apiRouter)

// @ts-ignore
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500
  res.send(err.message)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});


module.exports = app
