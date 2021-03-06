import { useContext } from 'react';
import styles from '../styles/components/ExperienceBar.module.css';
import { challengesContext } from './contexts/ChallengesContexts';

export function ExperienceBar() {
    const {currentExperience,  experienceToNextLevel} = useContext(challengesContext)

    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;
    
    return (
        <header className={styles.experienceBar}> 
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%`}}/>

                <span className={styles.currentexperience} style={{ left: `${percentToNextLevel}%` }}> 
                {currentExperience} xp
                </span>
            </div>
            <span>{ experienceToNextLevel } xp</span>
        </header>
    );
}