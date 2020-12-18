const short = require('short-uuid')
const express = require('express')
const app = express.Router()

const todos = {}

app.get('/uuid', (req, res) => {
    res.send(short.generate())
})

app.get('/get/:token', (req, res) => {
    const token = req.params.token
    res.json(todos[token] || [])
})

app.post('/add/:token', (req, res) => {
    const token = req.params.token
    if(!todos[token]) {
        todos[token] = []
    }
    todos[token].push({
        content: req.body,
        done: false
    })

    res.send('OK')
})

app.get('/state/:token/:index', (req, res) => {
    const token = req.params.token
    const index = req.params.index
    if(todos[token]) {
        const state = todos[token][index].done
        if(state !== undefined) {
            todos[token][index].done = !state
        }
    }
    res.send('OK')
})

app.get('/remove/:token/:index', (req, res) => {
    const token = req.params.token
    const index = req.params.index
    if(todos[token]) {
        if(index < todos[token].length) {
            todos[token].splice(index, 1)
        }
    }
    res.send('OK')
})

module.exports = app