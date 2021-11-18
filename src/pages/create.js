import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router'
import styles from '../styles/Create.module.css';

export default function Create() {
  const { data: session } = useSession()
  const router = useRouter()
  const [credores, setCredores] = useState([])
  const { register, handleSubmit, getValues, setValue } = useForm();
  
  const onSubmit = async data => {
    const payload = {
      user: session?.user.name,
      description: data.description,
      value: parseInt(data.value),
      people: credores
    }

    await fetch('http://localhost:3000/api/debit/create', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    })

    router.push('/dashboard')
  };

  const addCredor = () => {
    const name = getValues('credor')

    setCredores([...credores, name])
    setValue('credor', '')
  }

  return (
    <main className={styles.container}>
      <h1>Adicione um novo debito</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="description">Descricao:</label><br/>
        <input type="text" id="description" name="description" {...register('description')}/><br/>
        <label htmlFor="lname">Valor:</label><br/>
        <input type="text" id="value" name="value" {...register('value')}/><br/>
        <label htmlFor="lname">Credor:</label><br/>
        <input type="text" id="credor" name="credor" {...register('credor')}/>
        <button type="button" onClick={addCredor}>Adicionar</button><br/>
        <input type="submit" />
      </form>
      <ul>
        {credores.map(name => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </main>
  )
}