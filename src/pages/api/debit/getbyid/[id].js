import { ObjectId } from 'mongodb'
import clientPromise from "../../../../lib/mongo";

async function get(id, res) {
  const db = (await clientPromise).db("whopaysme");
  const response = await db.collection('debits').findOne({_id: ObjectId(id)})
  res.status(200).json(response)
}

export default async function handler(req, res) {
  const { id } = req.query
  get(id, res)
}