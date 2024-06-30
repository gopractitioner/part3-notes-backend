// import dotenv from 'dotenv';

// dotenv.config();
require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
let notes = [
    {
        "id": "1",
        "content": "HTML is easy",
        "date": "2022-1-17T17:30:31.098Z",
        "important": true
    },
    {
        "id": "2",
        "content": "Browser can execute only JavaScript",
        "date": "2022-1-17T18:39:34.091Z",
        "important": true
    },
    {
        "id": "3",
        "content": "GET and POST are the most important methods of HTTP protocol",
        "date": "2022-1-17T19:20:14.298Z",
        "important": false
    },
    {
        "id": "3479",
        "content": "as",
        "important": true,
        "date": "2024-06-23T09:26:36.347Z"
    },
    {
        "id": "6972",
        "content": "ui",
        "important": true,
        "date": "2024-06-23T09:31:39.516Z"
    },
    {
        "id": "ce9f",
        "content": "123",
        "important": true,
        "date": "2024-06-24T01:57:19.772Z"
    },
    {
        "id": "27d3",
        "content": "6",
        "important": false,
        "date": "2024-06-24T02:15:41.255Z"
    },
    {
        "id": "7dc6",
        "content": "12",
        "important": false,
        "date": "2024-06-24T02:16:29.110Z"
    },
    {
        "id": "6a0b",
        "content": "90",
        "important": true,
        "date": "2024-06-24T02:19:14.418Z"
    },
    {
        "id": "b1be",
        "content": "100",
        "important": false,
        "date": "2024-06-24T02:19:45.201Z"
    },
    {
        "id": "39a4",
        "content": "0",
        "important": false,
        "date": "2024-06-24T02:20:43.664Z"
    },
    {
        "id": "8e40",
        "content": "how to",
        "important": false,
        "date": "2024-06-24T02:42:09.279Z"
    },
    {
        "id": "02c4",
        "content": "how are you",
        "important": false,
        "date": "2024-06-24T02:43:06.891Z"
    },
    {
        "id": "0d2f",
        "content": "89",
        "important": true,
        "date": "2024-06-24T02:44:51.349Z"
    },
    {
        "id": "5d4d",
        "content": "199999999",
        "important": true,
        "date": "2024-06-24T02:50:33.225Z"
    },
    {
        "id": "e044",
        "content": "2000000000000",
        "important": true,
        "date": "2024-06-24T02:50:45.184Z"
    },
    {
        "id": "fb5c",
        "content": "1090",
        "important": true,
        "date": "2024-06-24T02:51:56.223Z"
    },
    {
        "id": "3c9a",
        "content": "zha",
        "important": false,
        "date": "2024-06-24T02:52:13.144Z"
    },
    {
        "id": "9d67",
        "content": "iuuuu",
        "important": false,
        "date": "2024-06-24T02:53:16.787Z"
    },
    {
        "id": "3305",
        "content": "o",
        "important": false,
        "date": "2024-06-24T03:11:49.478Z"
    },
    {
        "id": "b555",
        "content": "poi",
        "important": false,
        "date": "2024-06-24T06:51:12.750Z"
    },
    {
        "id": "679b",
        "content": "op7",
        "important": false,
        "date": "2024-06-24T06:52:19.503Z"
    },
    {
        "id": "9684",
        "content": "1234",
        "important": true,
        "date": "2024-06-24T09:20:36.686Z"
    },
    {
        "id": "e01a",
        "content": "123123",
        "important": false,
        "date": "2024-06-24T09:21:23.262Z"
    },
    {
        "id": "001f",
        "content": "2222222222",
        "important": false,
        "date": "2024-06-24T09:21:58.046Z"
    },
    {
        "id": "8365",
        "content": "qatr",
        "important": false,
        "date": "2024-06-24T09:22:18.617Z"
    },
    {
        "id": "4da4",
        "content": "adfafaf",
        "important": false,
        "date": "2024-06-26T12:44:55.970Z"
    },
    {
        "id": "d2da",
        "content": "12",
        "important": true,
        "date": "2024-06-26T12:45:56.383Z"
    },
    {
        "id": "32ec",
        "content": "2",
        "important": false,
        "date": "2024-06-26T12:47:42.010Z"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello Notes!</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.post('/api/notes', (request, response) => {
    const body = request.body
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        //id: Math.floor(Math.random() * 10000).toString()
    }

    notes = notes.concat(note)
    response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})