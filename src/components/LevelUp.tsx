import { useContext } from 'react'
import styles from '../styles/components/LevelUp.module.css'
import { challengesContext } from './contexts/ChallengesContexts'

export function LevelUpModal() {
    const {level, closeLevelUpModal} = useContext(challengesContext)
    return(
        <div className={styles.overlay}>
        <div className={styles.container}>
            <header>{level}</header>

            <strong>Parabéns</strong>
            <p>Você alcançou um novo level.</p>

            <button type="button" onClick={closeLevelUpModal}>
                <img src="/icons/cancel.svg" alt="Fechar Modal" style={{height: "1rem", width: "1rem"}}/>
            </button>
        </div>
        </div>
    )
}