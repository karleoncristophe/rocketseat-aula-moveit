import { useContext } from 'react'
import styles from '../styles/components/ChallengeBox.module.css'
import { challengesContext } from './contexts/ChallengesContexts'
import { countdownContext } from './contexts/CountdownContext'

export function ChallengeBox() {

    const {activeChallenge,  resetChallenge, completeChallenge} = useContext(challengesContext)
    const {resetCountDown} = useContext(countdownContext)

    function handleChallengeSucceeded() {
        completeChallenge()
        resetCountDown()
    }
    
    function handleChallengeFailded() {
        resetChallenge()
        resetCountDown()
    }

    
    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
             <div className={styles.challengeActive}>
                <header>Ganhe {activeChallenge.amount}</header> 

                <main>
                    <img src={`icons/${activeChallenge.type}.svg`} style={{height: "10rem", width: "10rem"}}/>
                    <strong>Novo desafio</strong>
                    <p>{activeChallenge.description}</p>
                </main>

                <footer>
                  <button 
                  onClick={handleChallengeFailded}
                  className={styles.challengeFailedButton}
                  type="button">
                      Falhei
                  </button>  
                  <button 
                  onClick={handleChallengeSucceeded}
                  className={styles.challengeCompleteButton}
                  type="button">
                      Completei
                  </button>  
                </footer>

             </div>
            ) : (
                 <div className={styles.challengeNotActive}>
                 <strong>
                     Finalize um ciclo para receber um desafio.
                 </strong>
                 <p>
                     <img src="icons/level.svg" />
                     Avance de level completando desafios.
                 </p>
             </div>       
            )}
        </div>  
    )
}