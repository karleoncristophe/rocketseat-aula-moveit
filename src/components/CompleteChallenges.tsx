import { useContext } from 'react'
import style from '../styles/components/CompleteChallenges.module.css'
import { challengesContext } from './contexts/ChallengesContexts'

export function CompleteChallenges() {
    const {challengesCompleted} = useContext(challengesContext)
    return (
        <div className={style.completeChallengesContainer }>
            <span>Desafios Completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}
