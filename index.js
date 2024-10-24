import 'dotenv/config.js'
import express from 'express'

import { PostgresHelper } from './src/db/postgres/helper.js'

const app = express()

app.use(express.json())

app.get('/api/users', async (req, res) => {
    const results = await PostgresHelper.query('SELECT * FROM users;')

    res.send(JSON.stringify(results))
})

app.post('/api/users', async (req, res) => {
    console.log(req.body)
    res.status(201).send('user created')
})

app.listen(process.env.PORT, () => console.log('listening on port 3000'))
