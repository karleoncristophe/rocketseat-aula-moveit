import { GetServerSideProps } from 'next'

import { CompleteChallenges } from "../components/CompleteChallenges";
import { CountDawn } from "../components/CountDawn";
import { ExperienceBar } from "../components/ExperienceBar"; 
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";

import Head from 'next/head'
import styles from '../styles/pages/Home.module.css'
import { CountdownProvider } from "../components/contexts/CountdownContext";
import { ChallengesProvider } from '../components/contexts/ChallengesContexts';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider 
    level={props.level}
     currentExperience={props.currentExperience} 
     challengeCompleted={props.challengeCompleted} >

    <div className={styles.container}>
      <Head>
        <title>Inicio | move.it</title>
      </Head>
      <ExperienceBar />
      <CountdownProvider>
        <section>
          <div>
            <Profile />
            <CompleteChallenges />
            <CountDawn />
          </div>
          <ChallengeBox />
          <div>

          </div>
        </section>
      </CountdownProvider>
    </div>

    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
 

  const {level, currentExperience, challengeCompleted } = ctx.req.cookies
  return {
    props: { 
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeCompleted: Number(challengeCompleted),
    }
  }
}