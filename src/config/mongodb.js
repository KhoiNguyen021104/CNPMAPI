import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment'

let databaseInstance = null

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()
  databaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
  if (!databaseInstance) throw new Error('No Connection')
  return databaseInstance
}

export const CLOSED_DB = async () => {
  await mongoClientInstance.close()
}