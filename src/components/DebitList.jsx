import { useRouter } from 'next/router';
import styles from '../styles/DebitList.module.css';

export function DebitList({data}) {
  const router = useRouter()

  const handleAddButton = () => router.push('/create')

  const handleDebitDetails = (id) => router.push(`/debit/${id}`)

  return (
    <div className={styles.container}>
      <button onClick={handleAddButton} className={styles.addButton}>Adicionar</button>
      <ul className={styles.list}>
        {data && data.map((debit) => (
          <li key={debit._id} onClick={()=> handleDebitDetails(debit._id)}>
            <p>
              {debit.description} 
            </p>
            <p>
              {debit.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}
            </p>

            <div className={styles.tag} style={{ backgroundColor: debit.paid ? 'green' : 'red' }}/>
          </li>
        ))}
      </ul>
    </div>
  )
}
