import clientPromise from "../../../lib/mongo";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { body } = req;
    const db = (await clientPromise).db("whopaysme")

    if (!body.username) {
      res.status(400).send('Missing arguments')
    }

    if (!body.password) {
      res.status(400).send('Missing arguments')
    }

    if (!db) {
      res.status(500).send('Internal error!')
    }

    const users = db.collection('users');

    // search for a Username
    const query = { name: body.username }
    const user = await users.findOne(query);

    res.status(200).send({
      id: user._id,
      name: user.name
    })
  } 
}