import { useRouter } from 'next/router';
import styles from '../../styles/DebitDetail.module.css';

export default function DebitDetails({ debit }) {
  const router = useRouter();

  if (!debit) {
    return <p>Carregando ...</p>
  }

  return (
    <main className={styles.container}>
      <span className={styles.cursorPointer} onClick={() => router.push('/dashboard')}>voltar</span>
      <h1>{debit.description}</h1>
      <p>Valor total: {debit.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}</p>

      <h3>Lista de credores:</h3>
      <ul>
        {debit.people.map((person) => (
          <li key={person.name} className={styles.cursorPointer}>{person.name} - {person.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}</li>
        ))}
      </ul>
    </main>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query
  const response = await fetch('http://localhost:3000/api/debit/getbyid/' + id, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    })

  const data = await response.json()

  return {
    props: {debit: data}, // will be passed to the page component as props
  }
}