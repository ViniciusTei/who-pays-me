import clientPromise from "../../../lib/mongo";

async function post(data, res) {
  if (!data.description || !data.value || !data.people) {
    res.status(400).send('Missing arguments')
  }

  const uploadData = {
    ...data,
    people: data.people.map((val => {
      return {
        name: val,
        value: data.value / (data.people.length + 1),
        paid: false,
      }
    })),
    paid: false
  }

  const db = (await clientPromise).db("whopaysme");
  const debits = db.collection('debits')

  debits.insertOne(uploadData);

  res.status(200).send('Success')
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    await post(data, res);
  }
}