const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const app = express()

const PORT = process.env.PORT || 3000

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.text())

app.use(express.static('public/'))
app.use('/api/', require('./api'))
app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/public/error.html')
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})