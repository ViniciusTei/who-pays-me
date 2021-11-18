import { useSession } from "next-auth/react";
import styles from '../styles/Header.module.css';

export default function Header() {
  const { data } = useSession()

  return (
    data ?
    <header className={styles.header}>
      <p>Who pays me!</p>
      <p>{data?.user.name}</p>
    </header>
    : null
  )
}