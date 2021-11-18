import { useSession, getSession } from "next-auth/react"
import Head from 'next/head'
import { DebitList } from "../components/DebitList";

import styles from "../styles/Dashboard.module.css";

export default function Dashboard({ debits }) {
  const { data } = useSession()

  const fetchDebits = async () => {
    const response = await fetch('http://localhost:3000/api/debit/create', {
      method: 'GET',
      body: JSON.stringify({user: data.user.name}),
      headers: { "Content-Type": "application/json" }
    })

    console.log(response)

  }

  return (
    <div className={styles.container}>
       <Head>
        <title>Who pays {data?.user.name}</title>
        <meta name="description" content="App to see who is on debit with you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DebitList data={debits}/>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const response = await fetch('http://localhost:3000/api/debit/' + session.user.name, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    })

  const data = await response.json()

  return {
    props: {debits: data}, // will be passed to the page component as props
  }
}