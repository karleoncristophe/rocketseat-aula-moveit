import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie'
import challenges from '../../../challenges.json';
import { LevelUpModal } from '../LevelUp';

interface Challenge {
   type: 'body | eye',
   description: string;
   amount: number;
}
interface challengesContextData {
     level: number;
     currentExperience: number;
     experienceToNextLevel: number;
     challengesCompleted: number;
     activeChallenge: Challenge,
     LevelUp: () => void;
     starNewChallenge: () => void;
     resetChallenge: () => void,
     completeChallenge: () => void,
     closeLevelUpModal: () => void,
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengeCompleted: number;
}

export const challengesContext = createContext({} as challengesContextData);

export function ChallengesProvider({
    children,
    ...rest}: ChallengesProviderProps) {

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted]  = useState(rest.challengeCompleted?? 0); 

    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setisLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, []) 

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExperience, challengesCompleted]) 

    function LevelUp() {
        setLevel(level + 1)
        setisLevelUpModalOpen(true)
    }

    function closeLevelUpModal() {
        setisLevelUpModalOpen(false)
    }

    function starNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        new Audio('/public_notification.mp3').play()

        if(Notification.permission === 'granted') {
            new Notification('Novo Desafio', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }
        
        const {amount} = activeChallenge;

        let finalExperience = currentExperience + amount

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            LevelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1)
    }
    
    return (
        <challengesContext.Provider 
        value={{
        level, 
        currentExperience,
        experienceToNextLevel,
        challengesCompleted,
        LevelUp,
        starNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge, 
        closeLevelUpModal,
        }}
    >
            {children}

           { isLevelUpModalOpen && <LevelUpModal/>}
        </challengesContext.Provider>
    )
}

