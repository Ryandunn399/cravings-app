const express = require('express')
const app = express()
const port = 3000

// Main route
app.get('/', (req, res) => {
    const output = '<h1>Hello, Server!</h1>'
    res.send(output)
})

// Listen on port 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})