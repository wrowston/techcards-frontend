const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(`${__dirname}/build`))
app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})