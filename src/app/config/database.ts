import pg from 'pg'
import { config } from './index.js'

const { Pool, Client } = pg
export const db=new Pool({
    connectionString :config.database_url
})

