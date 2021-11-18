import clientPromise from "../../../lib/mongo";

async function get(user, res) {
  const db = (await clientPromise).db("whopaysme");
  const response = db.collection('debits').find({ user })
  const allValues = await response.toArray();
  res.status(200).json(allValues)
}

export default async function handler(req, res) {
  const { user } = req.query
  get(user, res)
}