import 'dotenv/config.js'
import fs from 'fs'
import { pool } from '../helper.js'
import path from 'path'
import { fileURLToPath } from 'url'

const _filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(_filename)

const execMigrations = async () => {
    const client = await pool.connect()
    try {
        const files = fs
            .readdirSync(__dirname)
            .filter((file) => file.endsWith('.sql'))

        for (const file of files) {
            const filePath = path.join(__dirname, file)
            const script = fs.readFileSync(filePath, 'utf-8')

            await client.query(script)

            console.log(`Migration for file ${file} executed sucessfully`)
        }

        console.log('All Migrations executed sucessfully.')
    } catch (error) {
        console.log(error)
    } finally {
        await client.release()
    }
}

execMigrations()
