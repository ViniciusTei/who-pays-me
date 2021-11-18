import clientPromise from "../../../lib/mongo";

export default async function handler(req, res) {
  // create 
  if (req.method === 'POST') {
    const user = req.body
    const db = (await clientPromise).db("whopaysme")

    if (!user.username || !user.password) {
      res.status(400).send('Missing arguments')
    }

    if (!db) {
      res.status(500).send('Internal error!')
    }

    const users = db.collection("users")

    const findUser = users.findOne({ name: user.username })

    if (findUser) {
      res.status(404).send('User already exists')
    }

    const result = await users.insertOne({ name: user.username })

    res.status(200).json({
      id: result.insertedId,
      name: user.username 
    })

  }

}