// @ts-check

require('dotenv').config()

const app = require('./src/app')

const { PORT } = require('./src/common')
const mongo = require('./src/mongo')

mongo
    .connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App listening at http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error)
        throw error
    })